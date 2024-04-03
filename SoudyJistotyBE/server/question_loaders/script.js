const fs = require('fs')
const path = require('path')

// Define the path for the source HTML and the output TSX file
const SOURCE_FILE_PATH = path.join(__dirname, 'informovany-souhlas.html')
const OUTPUT_FILE_PATH = path.join(__dirname, 'InformedAgreement.tsx')

// Function to replace 'class' with 'className' and remove 'style' attributes
function transformHtml(html) {
  let output = html.replace(/class="/g, 'className="')
  output = output.replace(/ style="[^"]*"/g, '')
  return output
}

// Read the HTML file
fs.readFile(SOURCE_FILE_PATH, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the HTML file:', err)
    return
  }

  // Transform the HTML content
  const transformedHtml = transformHtml(data)

  // Wrap the content in a basic React functional component structure
  const tsxContent = `import React from 'react';

const InformedAgreement = () => (
    <>
        ${transformedHtml}
    </>
);

export default InformedAgreement;
`

  // Write the transformed content to a TSX file
  fs.writeFile(OUTPUT_FILE_PATH, tsxContent, 'utf8', (err) => {
    if (err) {
      console.error('Error writing the TSX file:', err)
      return
    }
    console.log('The TSX file has been saved!')
  })
})
