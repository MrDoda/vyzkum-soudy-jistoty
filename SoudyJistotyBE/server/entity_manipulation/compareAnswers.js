import { getLastDuoAnswer } from './getLastDuoAnswer'
import { botModifier } from './botConstants'

function calculateRoll({ confidence, modifier = 1, tries }) {
  console.log('confidence', confidence)
  console.log('modifier', modifier * tries)
  let finalNumber = confidence - modifier * tries
  console.log('finalNumber', finalNumber)
  finalNumber = Math.max(0, Math.min(100, finalNumber))

  const roll = Math.random() * 100

  console.log('roll <= finalNumber', roll, finalNumber, roll <= finalNumber)

  return roll <= finalNumber
}

export const compareAnswers = async function ({
  userKey,
  answerId,
  bot,
  questionId,
}) {
  const lastAnswer = await getLastDuoAnswer({ userKey, questionId })
  console.log('lastAnswer', lastAnswer)
  const tries = lastAnswer?.try || 1
  if (!lastAnswer) {
    return undefined
  }

  let newBotAnswerId = bot.answerId

  if (
    !calculateRoll({
      confidence: bot.confidence,
      modifier: botModifier[bot.confidence],
      tries,
    })
  ) {
    newBotAnswerId = answerId
  }

  return {
    subject2: {
      ...bot,
      answerId: newBotAnswerId,
    },
  }
}
