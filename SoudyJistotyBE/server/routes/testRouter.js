const express = require('express')
const { getUserKey, getSoloTest } = require('../utils/getHeaderValues')
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

          if (!user.currentVariant) {
            user.currentVariant = user.soloTestVariantOrder[0]
          }

          if (
            user.soloTestQuestions.length >=
            numberOfQuestionsPerVariant[user.currentVariant]
          ) {
            user.soloTestVariantOrder = user.soloTestVariantOrder.filter(
              (variant) => variant !== user.currentVariant
            )
            user.currentVariant = user.soloTestVariantOrder[0]
            user.soloTestQuestions = []
          }
        } catch {
          console.log('Failed to get current question from user IDS')
        }

        const questionQuery = `
                              SELECT 
                                  Q.*,
                                  O1.content AS option1Content,
                                  O2.content AS option2Content,
                                  O3.content AS option3Content,
                                  O4.content AS option4Content
                              FROM 
                                  Question Q
                              LEFT JOIN 
                                  QOption O1 ON Q.option1 = O1.ID
                              LEFT JOIN 
                                  QOption O2 ON Q.option2 = O2.ID
                              LEFT JOIN 
                                  QOption O3 ON Q.option3 = O3.ID
                              LEFT JOIN 
                                  QOption O4 ON Q.option4 = O4.ID
                              WHERE 
                                  ${
                                    user.soloTestQuestions.length > 0
                                      ? `Q.ID NOT IN (${user.soloTestQuestions.join(
                                          ','
                                        )}) AND`
                                      : ''
                                  } 
                                  Q.variant = '${user.soloTestVariant}' AND 
                                  Q.type = '${user.currentVariant}' 
                              ORDER BY 
                                  RAND() 
                              LIMIT 1;
                              `

        database.query(questionQuery, [], (error, questionResult) => {
          if (error) {
            console.error('No Question?', error, questionResult)
            return res.sendStatus(404)
          }
          if (questionResult.length < 1) {
          }

          const question = questionResult[0]

          if (!question) {
            return res.send({ testFinished: true })
          }

          user.soloTestQuestions.push(question.ID)
          const stringifiedSoloTestQuestions = JSON.stringify(
            user.soloTestQuestions
          )

          const stringifiedSoloTestVariantOrder = JSON.stringify(
            user.soloTestVariantOrder
          )

          const updateQuestions = `UPDATE User SET soloTestQuestions = '${stringifiedSoloTestQuestions}', soloTestVariantOrder = '${stringifiedSoloTestVariantOrder}' WHERE userKey = '${userKey}';`
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
      const soloTestId = getSoloTest(req)
      const { question, answerId, answer, trustScale } = req.body

      if (!question || !answer || !trustScale) {
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
        // TBD update how many are correct right now
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
