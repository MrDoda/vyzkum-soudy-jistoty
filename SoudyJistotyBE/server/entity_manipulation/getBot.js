import getDb from '../database'

const dbPromise = getDb(true)

function pickRandomWithWeights(values) {
  if (!Array.isArray(values)) {
    return 0
  }

  if (values.length < 3) {
    return values[0] || 0
  }

  const randomNumber = Math.random()

  if (randomNumber < 0.6) {
    return values[0]
  } else if (randomNumber < 0.8) {
    return values[1]
  } else {
    return values[2]
  }
}

function calculateRoll({ confidence, modifier = 1, tries }) {
  let finalNumber = confidence - modifier * tries
  finalNumber = Math.max(0, Math.min(100, finalNumber))

  const roll = Math.random() * 100

  return roll <= finalNumber
}
export const getBot = async (userKey, question) => {
  const queryBot = `SELECT * FROM BOT WHERE userId = "${userKey}";`
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
      } else {
        const options = [
          question?.option1,
          question?.option2,
          question?.option3,
          question?.option4,
        ].filter((option) => !!option)
        bot.answerId = pickRandomWithWeights(options)
      }

      return results[0]
    }
  } catch (error) {
    console.error('Error getting the bot:', error)
    return undefined
  }

  return undefined
}
