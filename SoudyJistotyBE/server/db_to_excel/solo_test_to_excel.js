const ExcelJS = require('exceljs')
const getDb = require('../database')

const dbPromise = getDb(true)

async function fetchData() {
  try {
    const [answers] = await dbPromise.query(`
            SELECT 
                a.*, 
                u.gender, 
                u.groupId, 
                u.seeAnswers, 
                u.soloTestVariant 
            FROM AnswerSolo a
            JOIN User u ON a.userId = u.userKey
        `)

    return answers
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

// Function to create and populate the XLSX file
async function createXlsx(data) {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Answers and Users')

  // Define the columns based on the AnswerSolo and User table structures
  worksheet.columns = [
    { header: 'ID', key: 'ID', width: 10 },
    { header: 'Was Correct', key: 'wasCorrect', width: 12 },
    { header: 'Second Best', key: 'secondBest', width: 12 },
    { header: 'Answer', key: 'answer', width: 30 },
    { header: 'Answer ID', key: 'answerId', width: 10 },
    { header: 'Trust Scale', key: 'trustScale', width: 12 },
    { header: 'Question ID', key: 'questionId', width: 12 },
    { header: 'Solo Test ID', key: 'soloTestId', width: 15 },
    { header: 'User ID', key: 'userId', width: 20 },
    { header: 'Created Date', key: 'createdDate', width: 20 },
    { header: 'Gender', key: 'gender', width: 8 },
    { header: 'Group ID', key: 'groupId', width: 10 },
    { header: 'See Answers', key: 'seeAnswers', width: 12 },
    { header: 'Solo Test Variant', key: 'soloTestVariant', width: 20 },
  ]

  // Add the data rows
  data.forEach((item) => {
    worksheet.addRow(item)
  })

  // Save the workbook to a file
  await workbook.xlsx.writeFile('AnswersAndUsers.xlsx')
  console.log('File has been written')
}

// Main function to execute the script
async function main() {
  try {
    const data = await fetchData()
    await createXlsx(data)
  } catch (error) {
    console.error('Failed to create XLSX file:', error)
  }
}

main()
