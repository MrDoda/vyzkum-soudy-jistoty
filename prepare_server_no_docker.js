const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

const outputPath = 'output-nodocker.zip';
const sourceDir = 'SoudyJistotyBE';

// Create a file to stream archive data to. This replaces the file if it already exists.
const output = fs.createWriteStream(outputPath);
const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
});

output.on('close', function() {
    console.log(`Archive created successfully. Total bytes: ${archive.pointer()}`);
});

archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
        // Log warning
        console.warn(err);
    } else {
        // Throw an error for other warnings
        throw err;
    }
});

archive.on('error', function(err) {
    throw err;
});

// Start the archive
archive.pipe(output);

// Add the contents of SoudyJistotyBE, excluding node_modules and dist, to the root of the archive
archive.glob('**/*', {
    cwd: sourceDir,
    ignore: ['node_modules/**', 'dist/**'],
    dot: true, // Include dot files
});

// Finalize the archive
archive.finalize();
