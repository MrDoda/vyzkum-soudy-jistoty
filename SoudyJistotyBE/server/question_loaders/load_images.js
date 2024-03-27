const fs = require('fs')
const path = require('path')

const mediaFolderPath = path.join(__dirname, 'media')

// Function to convert an image to Base64
function imageToBase64(filePath) {
  return fs.readFileSync(filePath, 'base64')
}

// Function to process images and group them into objects
function processImages() {
  let imagesData = []

  // Adjusted loop condition to cover up to image199.png
  for (let i = 1; i <= 199; i += 5) {
    // Ensure the loop does not exceed the range of available images
    if (i + 4 > 199) break // Prevents creating an object if there aren't enough images left for a full group

    let imageObject = {
      main: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
    }

    // Populate the object with images converted to Base64
    Object.keys(imageObject).forEach((key, index) => {
      const imageName = `image${i + index}.png`
      const imagePath = path.join(mediaFolderPath, imageName)
      if (fs.existsSync(imagePath)) {
        imageObject[key] = imageToBase64(imagePath)
      }
    })

    imagesData.push(imageObject)
  }

  return imagesData
}

let imagesData = processImages()

let sqlStatements = ''

imagesData.forEach((imageObject, index) => {
  // Generate INSERT statements for each image option
  const options = [
    imageObject.option1,
    imageObject.option2,
    imageObject.option3,
    imageObject.option4,
  ]

  options.forEach((option, optionIndex) => {
    // Ensure to escape single quotes for SQL
    let optionValue = option.replace(/'/g, "''")
    sqlStatements += `INSERT INTO QOption (content) VALUES ('${optionValue}');\n`
  })

  // Assuming option IDs are sequentially generated, calculate their IDs
  // This is for demonstration; in a real application, you'd fetch these from the database
  const baseOptionId = index * 4 + 320 // Adjust this based on your database's actual ID sequencing and starting index

  // INSERT statement for the Question, linking to the QOptions
  // The main image is used in the 'description' field
  let mainImageValue = imageObject.main.replace(/'/g, "''")
  sqlStatements += `INSERT INTO Question (questionType, description, option1, option2, option3, option4, type) VALUES ('Image', '${mainImageValue}', ${baseOptionId}, ${
    baseOptionId + 1
  }, ${baseOptionId + 2}, ${baseOptionId + 3}, 'image');\n\n`
})

// Write the SQL statements to a file
fs.writeFile('inserts_images.sql', sqlStatements, (err) => {
  if (err) throw err
  console.log('SQL insert statements have been written to inserts_images.sql')
})
