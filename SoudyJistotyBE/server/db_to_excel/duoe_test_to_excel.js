const ExcelJS = require('exceljs')

const getDb = require('../database')

const dbPromise = getDb(true)
async function fetchData() {
  try {
    // Adjusted query to fetch data from AnswerDuo
    const [answers] = await dbPromise.query(`
            SELECT 
                ad.*,
                u.gender, 
                u.groupId, 
                u.seeAnswers, 
                u.duoTestVariant
            FROM AnswerDuo ad
            JOIN User u ON ad.userId = u.userKey
        `)

    return answers
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

async function createXlsx(data) {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('AnswerDuo and Users')

  // Define columns for AnswerDuo and a few from User for context
  worksheet.columns = [
    { header: 'ID', key: 'ID', width: 10 },
    { header: 'Was Correct', key: 'wasCorrect', width: 12 },
    { header: 'Second Best', key: 'secondBest', width: 12 },
    { header: 'Was Match', key: 'wasMatch', width: 10 },
    { header: 'Is Final', key: 'isFinal', width: 10 },
    { header: 'Try', key: 'try', width: 10 },
    { header: 'Answer', key: 'answer', width: 30 },
    { header: 'Answer ID', key: 'answerId', width: 12 },
    { header: 'Trust Scale', key: 'trustScale', width: 12 },
    { header: 'Question ID', key: 'questionId', width: 12 },
    { header: 'Was Bot Correct', key: 'wasBotCorrect', width: 15 },
    { header: 'Bot Answer ID', key: 'botAnswerId', width: 15 },
    { header: 'Bot ID', key: 'botId', width: 10 },
    { header: 'Duo Test ID', key: 'duoTestId', width: 12 },
    { header: 'User ID', key: 'userId', width: 20 },
    { header: 'Created Date', key: 'createdDate', width: 20 },
    // User-specific columns for context
    { header: 'Gender', key: 'gender', width: 10 },
    { header: 'Group ID', key: 'groupId', width: 12 },
    { header: 'See Answers', key: 'seeAnswers', width: 15 },
    { header: 'Duo Test Variant', key: 'duoTestVariant', width: 18 },
  ]

  // Populate rows with data
  data.forEach((item) => {
    worksheet.addRow(item)
  })

  // Save the workbook to a file
  await workbook.xlsx.writeFile('AnswerDuoDetails.xlsx')
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
