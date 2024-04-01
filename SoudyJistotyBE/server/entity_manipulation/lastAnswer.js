import getDb from '../database'

const dbPromise = getDb(true)

export const getLastQuestion = async function (user, type = 'Duo') {
  const questions = user[`${type.toLowerCase()}TestQuestions`]

  let lastAnswer = undefined

  if (questions.length > 0 && questions[questions.length - 1]) {
    const lastQuestionId = questions[questions.length - 1]
    const lastAnswerQuery = `SELECT * FROM Answer${type} WHERE questionId = ${lastQuestionId} and userId = '${user.userKey}';`
    console.log('la', lastAnswerQuery)
    try {
      const [lastAnswerResult] = await dbPromise.query(lastAnswerQuery)

      if (Array.isArray(lastAnswerResult)) {
        lastAnswer = lastAnswerResult[0]
      }
    } catch (error) {
      console.error('Error fetching the last answer:', error)
    }

    const questionQuery = `SELECT 
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
                              WHERE 
                                  Q.ID = ${lastQuestionId};`

    if (!lastAnswer?.ID && lastQuestionId) {
      try {
        const [questionResult] = await dbPromise.query(questionQuery)

        if (questionResult.length < 1) {
          console.log('No results found for the last question.')
          return
        }

        return questionResult[0]
      } catch (error) {
        console.error('Error fetching the last question:', error)
        return
      }
    }
    if (lastAnswer && lastAnswer.isFinal === 0) {
      try {
        const [questionResult] = await dbPromise.query(questionQuery)

        if (questionResult.length < 1) {
          console.log('No results found for the last question.')
          return
        }

        return questionResult[0]
      } catch (error) {
        console.error('Error fetching the last question:', error)
        return
      }
    }
  }
}
