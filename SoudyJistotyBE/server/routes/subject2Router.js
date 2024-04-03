const express = require('express')
const getDb = require('../database')
const { createBot } = require('../entity_manipulation/createBot')
const { getBot } = require('../entity_manipulation/getBot')
const { getUserKey } = require('../utils/getHeaderValues')
const { compareAnswers } = require('../entity_manipulation/compareAnswers')
const router = express.Router()

const dbPromise = getDb(true)

export const subject2Router = router
  .post('/createSubject', async (req, res) => {
    console.log('subject2/createSubject')
    const userKey = getUserKey(req)
    if (!userKey) {
      console.error('No userKey')
      res.status(403)
      return res.send({
        message:
          'Omlouvám se nejste správně přihlášený! Zadejte znovu svůj kód!',
      })
    }

    const existingBot = await getBot(userKey)

    if (existingBot) {
      return res.send({ ok: true })
    }
    console.log('existingBot', existingBot)

    const bot = await createBot({ userKey })

    if (bot) {
      return res.send({ ok: true })
    }

    return res.sendStatus(400)
  })
  .post('/answer', async (req, res) => {
    console.log('subject2/answer')
    const userKey = getUserKey(req)
    if (!userKey) {
      console.error('No userKey')
      res.status(403)
      return res.send({
        message:
          'Omlouvám se nejste správně přihlášený! Zadejte znovu svůj kód!',
      })
    }
    const { question } = req.body

    if (!question) {
      return res.sendStatus(400)
    }

    const bot = await getBot(userKey, question)

    return res.send({
      subject2: bot,
    })
  })
  .post('/compareAnswers', async (req, res) => {
    console.log('subject2/compareAnswers')
    const userKey = getUserKey(req)
    if (!userKey) {
      console.error('No userKey')
      res.status(403)
      return res.send({
        message:
          'Omlouvám se nejste správně přihlášený! Zadejte znovu svůj kód!',
      })
    }

    const { answerId, subject2, questionId } = req.body

    if (!questionId || !answerId || !subject2) {
      return res.sendStatus(405)
    }

    const response = await compareAnswers({
      userKey,
      answerId,
      bot: subject2,
      questionId,
    })

    if (!response) {
      return res.sendStatus(404)
    }

    return res.send(response)
  })
