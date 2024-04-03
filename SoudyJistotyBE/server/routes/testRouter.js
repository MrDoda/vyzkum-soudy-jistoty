const express = require('express')
const { getUserKey, getSoloTest } = require('../utils/getHeaderValues')
const { numberOfQuestionsPerVariant } = require('../config')
const getDb = require('../database')
const { getUser } = require('../entity_manipulation/user')
const { getLastQuestion } = require('../entity_manipulation/lastAnswer')
const { getCurrentQuestion } = require('../entity_manipulation/questionQuery')
const router = express.Router()

const dbPromise = getDb(true)

const testRouter = (database) =>
  router
    .post('/isRunning', (req, res) => {
      console.log('/test/isRunning')

      const isTestRunning = 'SELECT * FROM UserGroup WHERE active = 1;'

      database.query(isTestRunning, [], (error, results) => {
        if (error || (Array.isArray(results) && results.length < 1)) {
          console.error('Not Allowed start', error, results)
          return res.sendStatus(404)
        }
        return res.send({ isTestRunning: true })
      })
    })
    .post('/getCurrentQuestion', async (req, res) => {
      console.log('/solo/getCurrentQuestion')
      const userKey = getUserKey(req)

      const user = await getUser(userKey)
      if (!user) {
        console.error('Login Failed')
        return res.sendStatus(403)
      }

      const lastQuestion = await getLastQuestion(user, 'Solo')
      if (lastQuestion) {
        return res.send({ question: lastQuestion })
      }

      const response = await getCurrentQuestion(user, 'solo')

      if (!response) {
        return res.sendStatus(404)
      }

      res.send(response)
    })

    .post('/setCurrentQuestion', (req, res) => {
      console.log('/test/setCurrentQuestion')
      const userKey = getUserKey(req)
      const soloTestId = getSoloTest(req)
      const { question, answerId, answer, trustScale, seeAnswers } = req.body

      if (!question || !answer || typeof trustScale !== 'number') {
        return res.sendStatus(401)
      }

      const wasCorrect = question?.option1 == answerId ? 1 : 0
      const secondBest = question?.option2 == answerId ? 1 : 0

      const setAnswerQuery = `INSERT INTO AnswerSolo (wasCorrect, secondBest, answer, answerId, trustScale, questionId, soloTestId, userId) VALUES (${wasCorrect}, ${secondBest}, '${answer}', '${answerId}', ${trustScale}, ${question.ID}, ${soloTestId}, '${userKey}');`
      console.log('setAnswerQuery', setAnswerQuery)

      database.query(setAnswerQuery, [], (error, results) => {
        if (error || (Array.isArray(results) && results.length < 1)) {
          console.error('Answer not saved', error, results)
          return res.sendStatus(402)
        }

        if (seeAnswers) {
          // TBD update how many are correct right now
        }

        return res.send({ wasCorrect })
      })
    })
    .post('/createSoloTest', (req, res) => {
      console.log('/test/createSoloTest', getUserKey(req))
      const userKey = getUserKey(req)

      if (!userKey) {
        console.error('No userKey')
        res.status(403)
        return res.send({
          message:
            'Omlouvám se nejste správně přihlášený! Zadejte znovu svůj kód!',
        })
      }

      const selectUserSoloTest = `SELECT * FROM SoloTest WHERE userId = (?);`

      database.query(selectUserSoloTest, [userKey], (error, results) => {
        if (error || (Array.isArray(results) && results.length < 1)) {
          console.error('Couldnt create soloTest', error, results)

          const createSoloTestQuery = `INSERT INTO SoloTest (userId) VALUES (?);`

          database.query(createSoloTestQuery, [userKey], (error, results) => {
            if (error) {
              console.error('Couldnt create soloTest', error, results)
              return res.sendStatus(404)
            }
            console.log('results', results)
            return res.send({ soloTest: results.insertId })
          })

          return
        }
        console.log('found soloTest for userKey')
        return res.send({ soloTest: results[0].ID })
      })
    })

module.exports = testRouter
