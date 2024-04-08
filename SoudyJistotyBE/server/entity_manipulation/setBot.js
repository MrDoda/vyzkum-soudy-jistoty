import getDb from '../database'

const dbPromise = getDb(true)
export const setBot = async (bot) => {
  const answersJSON = JSON.stringify(bot.answers)
  const updateBotQuery = `UPDATE BOT SET answers = '${answersJSON}' WHERE userId = '${bot.userId}';`

  console.log(updateBotQuery)

  try {
    const [results] = await dbPromise.query(updateBotQuery)

    if (results.affectedRows > 0) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error('Error updating the bot:', error)
    return false
  }
}
