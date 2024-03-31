const fs = require('fs')
const path = require('path')

const folderPath = 'tf1' // The folder containing the image files

// Function to get the correct suffix based on the set number
const getSuffix = (setNumber) => {
  const suffixes = ['ss3', 'ss1', 'ss2'] // Corrected pattern of suffixes
  return suffixes[(setNumber - 1) % suffixes.length] // Calculate suffix based on set number
}

// Creates the Questions array by using just the file names
const createQuestionsArray = async (type = 'md', startI = 1) => {
  const questions = []
  for (let i = startI; i <= startI + 19; i++) {
    // Loop from startI to startI+19 for the image sets
    const suffix = getSuffix(i)
    const fileBase = `tf1_${i}`
    const descriptionFileName = `${fileBase}_M_${suffix}.jpeg`
    const option1FileName = `${fileBase}_T1_${suffix}_${type}.jpeg`
    const option2FileName = `${fileBase}_T2_${suffix}_${type}.jpeg`
    const option3FileName = `${fileBase}_T3_${suffix}_${type}.jpeg`
    const option4FileName = `${fileBase}_T4_${suffix}_${type}.jpeg`

    // Construct the file paths to verify if files exist
    const filePaths = [
      path.join(folderPath, descriptionFileName),
      path.join(folderPath, option1FileName),
      path.join(folderPath, option2FileName),
      path.join(folderPath, option3FileName),
      path.join(folderPath, option4FileName),
    ]

    // Verify if files exist before adding them to the array
    const filesExist = filePaths.every((file) => fs.existsSync(file))

    if (!filesExist) {
      console.error(
        `One or more files for question set ${i} do not exist. Expected suffix: ${suffix}`
      )
      continue // Skip this iteration if any file is missing
    }

    // Add the file names to the questions array instead of their Base64 content
    questions.push({
      main: descriptionFileName,
      option1: option1FileName,
      option2: option2FileName,
      option3: option3FileName,
      option4: option4FileName,
      questionType: `${fileBase}_M_${suffix}_${type}`,
    })
  }

  return questions
}

const printTheImages = async (imagesData) => {
  let variant = 'A'

  let sqlStatements = ''

  imagesData.forEach((imageObject, index) => {
    // Generate INSERT statements for each image option
    const options = [
      imageObject.option1,
      imageObject.option2,
      imageObject.option3,
      imageObject.option4,
    ]

    if (index % 2) {
      variant = 'B'
    } else {
      variant = 'A'
    }

    options.forEach((option, optionIndex) => {
      // Ensure to escape single quotes for SQL
      let optionValue = option.replace(/'/g, "''")
      sqlStatements += `INSERT INTO QOption (content) VALUES ('${optionValue}');\n`
    })

    // Assuming option IDs are sequentially generated, calculate their IDs
    // This is for demonstration; in a real application, you'd fetch these from the database
    const baseOptionId = index * 4 + 321 // Adjust this based on your database's actual ID sequencing and starting index

    // INSERT statement for the Question, linking to the QOptions
    // The main image is used in the 'description' field
    let mainImageValue = imageObject.main.replace(/'/g, "''")
    const questionType = imageObject.questionType.replace(/'/g, "''")
    sqlStatements += `INSERT INTO Question (variant, questionType, description, option1, option2, option3, option4, type) VALUES ('${variant}', '${questionType}', '${mainImageValue}', ${baseOptionId}, ${
      baseOptionId + 1
    }, ${baseOptionId + 2}, ${baseOptionId + 3}, 'image');\n\n`
  })

  // Write the SQL statements to a file
  fs.writeFile('inserts_images.sql', sqlStatements, (err) => {
    if (err) throw err
    console.log('SQL insert statements have been written to inserts_images.sql')
  })
}

createQuestionsArray().then((imagesData1) => {
  createQuestionsArray('pd', 21).then((imagesData2) => {
    const imagesData = [...imagesData1, ...imagesData2]
    printTheImages(imagesData)
  })
})
