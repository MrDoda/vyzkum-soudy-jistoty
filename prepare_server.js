const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

const outputPath = 'output.zip';
const sourceDir = 'SoudyJistotyBE';

const output = fs.createWriteStream(outputPath);
const archive = archiver('zip', {
    zlib: { level: 9 }
});

output.on('close', function() {
    console.log(`Archive created successfully. Total bytes: ${archive.pointer()}`);
});

archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
        console.warn(err);
    } else {
        throw err;
    }
});

archive.on('error', function(err) {
    throw err;
});

archive.pipe(output);

archive.file('Dockerfile', { name: 'Dockerfile' });

function addFilesRecursively(dirPath, archive, baseDir) {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        if (file === 'node_modules' || file === 'dist') {
            return;
        }
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isFile()) {
            archive.file(filePath, { name: path.join(baseDir, file) });
        } else if (stat.isDirectory()) {
            const newBaseDir = path.join(baseDir, file);
            addFilesRecursively(filePath, archive, newBaseDir);
        }
    });
}

addFilesRecursively(sourceDir, archive, sourceDir);

archive.finalize();
