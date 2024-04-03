export const saveBot = (bot) => {
  bot.answers = bot.answers.shift()

  const saveBotQuery = `UPDATE BOT SET confidence = ${
    bot.confidence
  }, competence = ${bot.competence}, answers = '${JSON.stringify(
    bot.answers
  )}' WHERE userId = '${bot.userId}';`
}
