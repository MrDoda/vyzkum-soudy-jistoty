import {
  botProperties,
  getBotConstant,
  pickRandomBotProperties,
} from './botConstants'
import getDb from '../database'
import { numberOfQuestionsPerVariant } from '../config'

const dbPromise = getDb(true)

function generateAnswersArray(competence) {
  const numberOfQuestions =
    numberOfQuestionsPerVariant.bool +
    numberOfQuestionsPerVariant.alltext +
    numberOfQuestionsPerVariant.anatext +
    numberOfQuestionsPerVariant.image

  const numberOfOnes = Math.round((competence / 100) * numberOfQuestions)

  const array = new Array(numberOfQuestions).fill(0)

  for (let count = 0; count < numberOfOnes; count++) {
    let index
    do {
      index = Math.floor(Math.random() * numberOfQuestions)
    } while (array[index] === 1)
    array[index] = 1
  }

  return array
}

export const createBot = async function ({ userKey }) {
  const lastBotQuery = `SELECT * FROM BOT ORDER BY id DESC LIMIT 1;`
  let variant
  try {
    const [results] = await dbPromise.query(lastBotQuery)
    if (results.length > 0) {
      console.log('Bot already exists')
    }
    variant = getBotConstant(results[0].variant)
  } catch {}

  const bot = botProperties[variant] || pickRandomBotProperties()

  let answers = '[]'
  try {
    answers = JSON.stringify(generateAnswersArray(bot.competence))
  } catch (error) {
    console.error('Error generating answers:', error)
    return undefined
  }

  const createBotQuery = `INSERT INTO BOT (confidence, competence, userId, answers, variant) VALUES (${bot.confidence}, ${bot.competence}, '${userKey}', '${answers}', ${variant});`
  console.log('createBotQuery', createBotQuery)
  try {
    const [results] = await dbPromise.query(createBotQuery)
    console.log('bot created')
    return true
  } catch (error) {
    console.error('Error creating the bot:', error)
    return undefined
  }
}
