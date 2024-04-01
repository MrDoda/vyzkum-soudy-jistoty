import getDb from '../database'

const dbPromise = getDb(true)
export const getBot = async (userKey, question) => {
  const queryBot = `SELECT * FROM bot WHERE userId = "${userKey}";`
  console.log('queryBot', queryBot)
  try {
    const [results] = await dbPromise.query(queryBot)
    if (results.length > 0) {
      const bot = results[0]

      try {
        bot.answers = JSON.parse(bot.answers)
      } catch {
        return undefined
      }
      bot.answerId = bot.answers[0]

      if (bot.answerId && question?.option1) {
        bot.answerId = question?.option1
      }

      return results[0]
    }
  } catch (error) {
    console.error('Error getting the bot:', error)
    return undefined
  }

  return undefined
}
