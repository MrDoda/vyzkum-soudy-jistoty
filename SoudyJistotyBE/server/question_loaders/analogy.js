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
    analogyType: row[0],
    questionDescription: row[1],
    questionFirstWord: row[2],
    answer1: row[3],
    answer2: row[4],
    answer3: row[5],
    answer4: row[6],
    correct: row[7],
  }))

  return questions
}

// Path to your `true_false.xlsx` file
const filePath = 'analogy_q.xlsx'

// Load the data
const questionsArray = loadExcelData(filePath)

console.log(questionsArray)

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]] // Swap elements
  }
}

const rearrangeAnswers = (questions) => {
  return questions.map((question) => {
    // Extract all answers and the correct one
    const answers = [
      question.answer1,
      question.answer2,
      question.answer3,
      question.answer4,
    ]
    const correctAnswer = question.correct

    // Find the correct answer and place it in position 0
    const correctIndex = answers.indexOf(correctAnswer)
    if (correctIndex !== -1) {
      ;[answers[0], answers[correctIndex]] = [answers[correctIndex], answers[0]]
    }

    // Shuffle the remaining answers except the first one (correct answer)
    const shuffledAnswers = [answers[0], ...answers.slice(1)]
    shuffleArray(shuffledAnswers.slice(1)) // This modifies the array in place

    // Return the new object with rearranged answers
    return {
      questionField: question.analogyType,
      questionDescription: question.questionDescription,
      questionFirstWord: question.questionFirstWord,
      answer1: shuffledAnswers[0],
      answer2: shuffledAnswers[1],
      answer3: shuffledAnswers[2],
      answer4: shuffledAnswers[3],
      correct: question.correct,
    }
  })
}

// Example usage
const questions = questionsArray

const rearrangedQuestions = rearrangeAnswers(questions)
console.log(rearrangedQuestions)

const fs = require('fs')

let sqlStatements = ''

rearrangedQuestions.forEach((question, index) => {
  // Generate INSERT statements for each answer as QOption
  const answers = [
    question.answer1.toString(),
    question.answer2.toString(),
    question.answer3.toString(),
    question.answer4.toString(),
  ]
  answers.forEach((answer) => {
    sqlStatements += `INSERT INTO QOption (content) VALUES ('${answer.replace(
      "'",
      "''"
    )}');\n`
  })

  // Assuming option IDs are sequentially generated, calculate their IDs
  // This is for demonstration; in a real application, you'd fetch these from the database
  const baseOptionId = index * 4 + 1 + 240 // Adjust based on actual ID sequencing logic

  // INSERT statement for the Question, linking to the QOptions
  sqlStatements += `INSERT INTO Question (questionType, description, firstWord, option1, option2, option3, option4, type, variant) VALUES ('${question.questionField.replace(
    "'",
    "''"
  )}', '${question.questionDescription.replace(
    "'",
    "''"
  )}', '${question.questionFirstWord.replace("'", "''")}', ${baseOptionId}, ${
    baseOptionId + 1
  }, ${baseOptionId + 2}, ${baseOptionId + 3}, 'anatext', 'A');\n\n`
})

// Write the SQL statements to a file
fs.writeFile('inserts_analogy.sql', sqlStatements, (err) => {
  if (err) throw err
  console.log('SQL insert statements have been written to inserts_analogy.sql')
})
