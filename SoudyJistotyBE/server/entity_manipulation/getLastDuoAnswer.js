import getDb from '../database'

const dbPromise = getDb(true)

export const getLastDuoAnswer = async function ({ userKey }) {
  const selectLastAnswer = `SELECT * FROM AnswerDuo WHERE userId = '${userKey}' ORDER BY ID DESC LIMIT 1;`
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
