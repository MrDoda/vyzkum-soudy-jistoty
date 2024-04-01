import { pickRandomBotProperties } from './botConstants'
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
  const bot = pickRandomBotProperties()
  let answers = '[]'
  try {
    answers = JSON.stringify(generateAnswersArray(bot.competence))
  } catch (error) {
    console.error('Error generating answers:', error)
    return undefined
  }

  const createBotQuery = `INSERT INTO Bot (confidence, competence, userId, answers) VALUES (${bot.confidence}, ${bot.competence}, '${userKey}', '${answers}');`
  console.log('createBotQuery', createBotQuery)
  try {
    const [results] = await dbPromise.query(createBotQuery)
    console.log('results', results)
    return results[0]
  } catch (error) {
    console.error('Error creating the bot:', error)
    return undefined
  }
}
