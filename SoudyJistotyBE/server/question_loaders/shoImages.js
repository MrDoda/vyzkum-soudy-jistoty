const fs = require('fs')
const database = require('../database')

const questionQuery = `
                              SELECT 
                                  Q.*,
                                  O1.content AS option1Content,
                                  O2.content AS option2Content,
                                  O3.content AS option3Content,
                                  O4.content AS option4Content
                              FROM 
                                  Question Q
                              LEFT JOIN 
                                  QOption O1 ON Q.option1 = O1.ID
                              LEFT JOIN 
                                  QOption O2 ON Q.option2 = O2.ID
                              LEFT JOIN 
                                  QOption O3 ON Q.option3 = O3.ID
                              LEFT JOIN 
                                  QOption O4 ON Q.option4 = O4.ID
                              `

// This function decodes a base64 string and returns the data URI for embedding an image in HTML
const decodeBase64Image = (base64String) =>
  `data:image/png;base64,${base64String}`

// This function accepts an array of Question objects and generates an HTML file
const generateHtmlWithImages = (questions) => {
  let htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Questions and Options</title>
    </head>
    <body>
      <table border="1">
        <tr>
          <th>Description</th>
          <th>Option 1</th>
          <th>Option 2</th>
          <th>Option 3</th>
          <th>Option 4</th>
        </tr>`

  questions.forEach((q) => {
    htmlContent += `
      <tr>
        <td><img src="${decodeBase64Image(
          q.description
        )}" alt="Description Image"/></td>
        <td><img src="${decodeBase64Image(
          q.option1Content
        )}" alt="Option 1"/></td>
        <td><img src="${decodeBase64Image(
          q.option2Content
        )}" alt="Option 2"/></td>
        <td><img src="${decodeBase64Image(
          q.option3Content
        )}" alt="Option 3"/></td>
        <td><img src="${decodeBase64Image(
          q.option4Content
        )}" alt="Option 4"/></td>
      </tr>`
  })

  htmlContent += `
      </table>
    </body>
    </html>`

  // Write the HTML content to a file
  fs.writeFile('questions.html', htmlContent, (err) => {
    if (err) {
      console.error('Error writing HTML file:', err)
    } else {
      console.log('HTML file has been generated successfully.')
    }
  })
}

database.query(questionQuery, [], (error, questionResult) => {
  if (error) {
    console.error('No Question?', error, questionResult)
  }
  console.log(questionResult)
  generateHtmlWithImages(questionResult)
})

// Example usage:
// Note: Replace 'yourBase64' with actual Base64 encoded strings for images.
/*
const questions = [
  {
    ID: 1,
    questionType: 'Example',
    firstWord: 'Example',
    description: 'yourBase64',
    createdDate: '2023-04-01',
    orderNumber: 1,
    option1: 1,
    option1Content: 'yourBase64',
    option2: 2,
    option2Content: 'yourBase64',
    option3: 3,
    option3Content: 'yourBase64',
    option4: 4,
    option4Content: 'yourBase64',
    variant: 'Example',
    type: 'image',
  }
];

generateHtmlWithImages(questions);
*/
