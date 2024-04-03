import getDb from '../database'

const dbPromise = getDb(true)

export const getLastDuoAnswer = async function ({ userKey, questionId }) {
  const selectLastAnswer = `SELECT * FROM AnswerDuo WHERE userId = '${userKey}' and questionId = ${questionId} ORDER BY ID DESC LIMIT 1;`
  console.log('get_last answer', selectLastAnswer)
  try {
    const [results] = await dbPromise.query(selectLastAnswer)
    if (results.length > 0) {
      return results[0]
    }
  } catch (error) {
    console.error('Error fetching the last answer:', error)
    return undefined
  }
}
