import getDb from '../database'
import { setBot } from './setBot'

const dbPromise = getDb(true)

export const setDuoAnswer = async function ({
  answerId,
  trustScale,
  question,
  duoTestId,
  userKey,
  answer,
  isFinal,
  subject2,
}) {
  const botId = subject2.ID
  const botAnswerId = subject2.answerId

  const wasCorrect = question?.option1 == answerId ? 1 : 0
  const secondBest = question?.option2 == answerId ? 1 : 0

  const wasMatch = botAnswerId === answerId ? 1 : 0
  isFinal = wasMatch ? 1 : isFinal

  const wasBotCorrect = question?.option1 == botAnswerId ? 1 : 0

  let numberOfTries = 1
  const selectAnswer = `SELECT * FROM AnswerDuo WHERE questionId = ${question.ID} AND userId = '${userKey}' AND duoTestId = ${duoTestId};`
  try {
    const [results] = await dbPromise.query(selectAnswer)
    numberOfTries = results.length + 1
  } catch (error) {}

  const setAnswerQuery = `INSERT INTO AnswerDuo (wasCorrect, secondBest, answer, answerId, trustScale, questionId, duoTestId, userId, botAnswerId, 
botId, 
wasMatch, 
isFinal, 
wasBotCorrect,
try ) VALUES (${wasCorrect}, ${secondBest}, 
'${answer}', '${answerId}', ${trustScale}, ${question.ID}, ${duoTestId}, '${userKey}', 
 ${botAnswerId}, ${botId}, ${wasMatch}, ${isFinal}, ${wasBotCorrect}, ${numberOfTries}
);`
  console.log('setAnswerQuery', setAnswerQuery)

  try {
    const [results] = await dbPromise.query(setAnswerQuery)
    console.log('results', results)
  } catch (error) {
    console.error('Error setting the answer:', error)
    return false
  }

  return await setBot(subject2)
}
