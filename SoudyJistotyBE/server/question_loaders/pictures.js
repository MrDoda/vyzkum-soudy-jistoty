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
    mainPicture: row[0],
    answer1: row[1],
    answer2: row[2],
    answer3: row[3],
    answer4: row[4],
  }))

  return questions
}

// Path to your `true_false.xlsx` file
const filePath = 'pictures.xlsx'

// Load the data
const questionsArray = loadExcelData(filePath)

console.log(questionsArray)
