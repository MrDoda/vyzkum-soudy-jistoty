import { getLastDuoAnswer } from './getLastDuoAnswer'
import { botModifier } from './botConstants'

function calculateRoll({ confidence, modifier = 1, tries }) {
  let finalNumber = confidence - modifier * tries
  finalNumber = Math.max(0, Math.min(100, finalNumber))

  const roll = Math.random() * 100

  return roll <= finalNumber
}

export const compareAnswers = async function ({ userKey, answerId, bot }) {
  const lastAnswer = await getLastDuoAnswer({ userKey })
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
    ...bot,
    answerId: newBotAnswerId,
  }
}
