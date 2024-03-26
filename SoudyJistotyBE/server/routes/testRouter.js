const express = require('express')
const { getUserKey } = require('../utils/getHeaderValues')
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

      const currentQuestion = `SELECT * FROM userGroup WHERE active = 1;`

      database.query(currentQuestion, [], (error, results) => {
        if (error || (Array.isArray(results) && results.length < 1)) {
          console.error('Not Allowed start', error, results)
          return res.sendStatus(404)
        }
        return res.send({ isTestRunning: true })
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
      console.log('/test/createSoloTest')
      const userKey = getUserKey(req)

      if (!userKey) {
        console.error('No userKey')
        res.status(403)
        return res.send({
          message:
            'Omlouvám se nejste správně přihlášený! Zadejte znovu svůj kód!',
        })
      }

      let hasSoloTest = false
      const selectUserSoloTest = `SELECT * FROM SoloTest WHERE userId = (?);`

      database.query(selectUserSoloTest, [userKey], (error, results) => {
        if (error || (Array.isArray(results) && results.length < 1)) {
          console.error('Couldnt create soloTest', error, results)
          hasSoloTest = false
          return
        }
        hasSoloTest = true
        res.session.soloTestId = results[0].ID
        return res.send({ ok: true })
      })

      if (hasSoloTest) {
        return
      }

      const createSoloTestQuery = `INSERT INTO SoloTest (userId) VALUES (?);`

      database.query(createSoloTestQuery, [userKey], (error, results) => {
        if (error) {
          console.error('Couldnt create soloTest', error, results)
          return res.sendStatus(404)
        }
        return res.send({ ok: true })
      })
    })

module.exports = testRouter
