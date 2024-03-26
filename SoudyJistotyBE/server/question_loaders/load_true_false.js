const xlsx = require('xlsx')

function loadExcelData(filePath) {
  // Load the workbook
  const workbook = xlsx.readFile(filePath)

  // Get the first sheet name and load it
  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]

  // Convert the sheet to JSON
  const data = xlsx.utils.sheet_to_json(sheet, { header: 1 }) // Get rows as arrays

  // Skip the first line (headers) and map the rows to objects
  const questions = data.slice(1).map((row) => ({
    questionField: row[0],
    questionDescription: row[1],
    answer: row[2],
  }))

  return questions
}

// Path to your `true_false.xlsx` file
const filePath = 'true_false.xlsx'

// Load the data
const questionsArray = loadExcelData(filePath)

const questionsArray2 = questionsArray.map((question) => {
  return {
    questionField: question.questionField,
    questionDescription: question.questionDescription,
    answer1: question.answer.toString().toUpperCase(),
    answer2: (!question.answer).toString().toUpperCase(),
  }
})

console.log(questionsArray2)

const fs = require('fs')

let sqlStatements = ''

questionsArray2.forEach((question, index) => {
  // Assuming QOption IDs start from 1 and increment by 1 for each new option
  const option1Id = index * 2 + 1 // Simulated ID for answer1's QOption
  const option2Id = index * 2 + 2 // Simulated ID for answer2's QOption

  // QOption inserts
  sqlStatements += `INSERT INTO QOption (content) VALUES ('${question.answer1}');\n`
  sqlStatements += `INSERT INTO QOption (content) VALUES ('${question.answer2}');\n`

  // Question insert
  sqlStatements += `INSERT INTO Question (questionType, description, option1, option2, type, variant) VALUES ('${question.questionField}', '${question.questionDescription}', ${option1Id}, ${option2Id}, 'bool', 'A');\n\n`
})

// Write the generated SQL statements to a file
fs.writeFile('inserts.sql', sqlStatements, (err) => {
  if (err) throw err
  console.log('SQL insert statements have been written to inserts.sql')
})
