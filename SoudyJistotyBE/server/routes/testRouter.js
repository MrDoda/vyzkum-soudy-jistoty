const express = require('express')
const { getUserKey } = require('../utils/getHeaderValues')
const { numberOfQuestionsPerVariant } = require('../config')
const router = express.Router()

const testRouter = (database) =>
  router
    .post('/isRunning', (req, res) => {
      console.log('/test/isRunning')

      const isTestRunning = 'SELECT * FROM userGroup WHERE active = 1;'

      database.query(isTestRunning, [], (error, results) => {
        if (error || (Array.isArray(results) && results.length < 1)) {
          console.error('Not Allowed start', error, results)
          return res.sendStatus(404)
        }
        return res.send({ isTestRunning: true })
      })
    })
    .post('/getCurrentQuestion', (req, res) => {
      console.log('/test/getCurrentQuestion')
      const userKey = getUserKey(req)

      const query = `SELECT * FROM user WHERE userKey = "${userKey}";`
      database.query(query, [], (error, results) => {
        if (error || (Array.isArray(results) && results.length < 1)) {
          console.error('Login Failed', error, results)
          return res.sendStatus(403)
        }
        const user = results[0]

        try {
          user.soloTestQuestions = JSON.parse(user.soloTestQuestions)
          user.soloTestVariantOrder = JSON.parse(user.soloTestVariantOrder)
          const length = user.soloTestQuestions.length
          const currentVariant = Math.floor(
            length / numberOfQuestionsPerVariant
          )
          user.current_q_type = user.soloTestVariantOrder[currentVariant]
        } catch {
          console.log('Failed to get current question from user IDS')
        }

        const questionQuery = `SELECT * FROM Question WHERE ${
          user.soloTestQuestions.length > 0
            ? `ID NOT IN (${user.soloTestQuestions.join(',')}) AND`
            : ''
        } variant = '${user.soloTestVariant}' AND type = '${
          user.current_q_type
        }' ORDER BY RAND() LIMIT 1;`

        console.log('questionQuery', questionQuery)

        database.query(questionQuery, [], (error, questionResult) => {
          if (
            error ||
            (Array.isArray(questionResult) && questionResult.length < 1)
          ) {
            console.error('No Question?', error, questionResult)
            return res.sendStatus(404)
          }
          const question = questionResult[0]

          user.soloTestQuestions.push(question.ID)
          const stringifiedSoloTestQuestions = JSON.stringify(
            user.soloTestQuestions
          )

          const updateQuestions = `UPDATE User SET soloTestQuestions = '${stringifiedSoloTestQuestions}' WHERE userKey = '${userKey}';`
          database.query(updateQuestions, [], (error, userResult) => {
            if (error) {
              console.error('Failed to update user', error, userResult)
              return res.sendStatus(404)
            }

            return res.send({ question })
          })
        })
      })
    })

    .post('/setCurrentQuestion', (req, res) => {
      console.log('/test/setCurrentQuestion')
      const userKey = getUserKey(req)

      const currentQuestion = `SELECT * FROM userGroup WHERE active = 1;`

      database.query(currentQuestion, [], (error, results) => {
        if (error || (Array.isArray(results) && results.length < 1)) {
          console.error('Not Allowed start', error, results)
          return res.sendStatus(404)
        }
        return res.send({ isTestRunning: true })
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
