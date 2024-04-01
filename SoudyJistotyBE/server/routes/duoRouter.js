const express = require('express')
const { getUserKey, getDuoTest } = require('../utils/getHeaderValues')
const { numberOfQuestionsPerVariant } = require('../config')
const getDb = require('../database')
const { getUser } = require('../entity_manipulation/user')
const { getLastQuestion } = require('../entity_manipulation/lastAnswer')
const { getCurrentQuestion } = require('../entity_manipulation/questionQuery')
const { setDuoAnswer } = require('../entity_manipulation/setDuoAnswer')
const router = express.Router()

const dbPromise = getDb(true)

const duoRouter = (database) =>
  router
    .post('/isRunning', async (req, res) => {
      console.log('duo/isRunning')
      const isTestRunning = 'SELECT * FROM userGroup WHERE activeDuo = 1;'

      database.query(isTestRunning, [], (error, results) => {
        if (error || (Array.isArray(results) && results.length < 1)) {
          console.error('Not Allowed start', error, results)
          return res.sendStatus(404)
        }
        return res.send({ isTestRunning: true })
      })
    })

    .post('/getCurrentQuestion', async (req, res) => {
      console.log('/duo/getCurrentQuestion')
      const userKey = getUserKey(req)

      const user = await getUser(userKey)
      if (!user) {
        console.error('Login Failed')
        return res.sendStatus(403)
      }

      const lastQuestion = await getLastQuestion(user)
      if (lastQuestion) {
        return res.send({ question: lastQuestion })
      }

      const response = await getCurrentQuestion(user)

      if (!response) {
        return res.sendStatus(404)
      }

      res.send(response)
    })

    .post('/createDuoTest', async (req, res) => {
      console.log('duo/createDuoTest')
      const userKey = getUserKey(req)
      if (!userKey) {
        console.error('No userKey')
        res.status(403)
        return res.send({
          message:
            'Omlouvám se nejste správně přihlášený! Zadejte znovu svůj kód!',
        })
      }

      const selectUserDuoTest = `SELECT * FROM DuoTest WHERE userId = (?);`

      database.query(selectUserDuoTest, [userKey], (error, results) => {
        if (error || (Array.isArray(results) && results.length < 1)) {
          console.error('Couldnt create duoTest', error, results)

          const createDuoTestQuery = `INSERT INTO DuoTest (userId) VALUES (?);`

          database.query(createDuoTestQuery, [userKey], (error, results) => {
            if (error) {
              console.error('Couldnt create duoTest', error, results)
              return res.sendStatus(404)
            }
            console.log('results', results)
            return res.send({ duoTest: results.insertId })
          })

          return
        }
        console.log('found duoTest for userKey')
        return res.send({ duoTest: results[0].ID })
      })
    })
    .post('/setCurrentQuestion', async (req, res) => {
      console.log('/duo/setCurrentQuestion', req.body)
      const { question, answerId, answer, trustScale, isFinal, subject2 } =
        req.body
      const userKey = getUserKey(req)
      const duoTestId = getDuoTest(req)
      if (!userKey) {
        console.error('Login Failed')
        return res.sendStatus(403)
      }
      if (!question || !answerId || !answer || typeof trustScale !== 'number') {
        console.error('Missing data')
        return res.sendStatus(401)
      }

      const isSaved = await setDuoAnswer({
        answerId,
        trustScale,
        question,
        duoTestId,
        userKey,
        answer,
        isFinal,
        subject2,
      })
      if (!isSaved) {
        console.error('Answer not saved')
        return res.sendStatus(402)
      }

      return res.send({ wasCorrect: question?.option1 == answerId ? 1 : 0 })
    })

module.exports = duoRouter
