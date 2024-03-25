const express = require('express')
const { renderToStaticMarkup } = require('react-dom/server')
const React = require('react')
const WebsocketInit = require('./components/WebsocketInit')
const Question = require('./components/Question')
const getClient = require('./getClient')
const QuestionSubmit = require('./components/QuestionSubmit')
const LastQuestionSubmit = require('./components/LastQuestionSubmit')
const DuoTest = require('./components/DuoTest')

const router = express.Router()

const duoTestRouter = (websocket, database) =>
  router
    .post('/', (req, res) => {
      console.log('/duoTest')
      res.send(renderToStaticMarkup(<DuoTest />))
    })

    .post('/question/init', (req, res) => {
      // TODO there it needs to wait for second player
      const userID = req.session.clientId
      const userId2 = 'kral' //TODO need second user

      let wsClient
      websocket.clients.forEach((client) => {
        if (client.session.sessionId === req.session.sessionId)
          wsClient = client
      })

      const query = `
        INSERT INTO DuoTest (userID, userID2)
        VALUES (?, ?);
      `

      database.query(query, [userID, userId2], (err, result) => {
        if (err) {
          res.status(500).send('Error creating new DuoTest')
          console.error(err.message)
        } else {
          req.session.answer = { duoTestId: result.insertId }
        }
      })

      //TODO qtype
      const qType = 'set1'
      const queryQuestionsForTest = `
        SELECT 
            q.ID as questionId, 
            q.description as questionDescription, 
            q.type as questionType,
            q.correct as correctOptionId,
            o.ID as optionId,
            o.description as optionDescription,
            o.image as optionImage
        FROM 
            Question q
        INNER JOIN 
            QuestionQOption qo ON q.ID = qo.QuestionID
        INNER JOIN 
            QOption o ON qo.OptionID = o.ID
        WHERE 
            q.type = '${qType}'
        ORDER BY 
            q.ID, o.ID;
    `

      database.query(queryQuestionsForTest, (err, results) => {
        if (err) {
          res.status(500).send('Error fetching questions')
          return console.error(err.message)
        }
        const questions = {}
        results.forEach((row) => {
          if (!questions[row.questionId]) {
            questions[row.questionId] = {
              ID: row.questionId,
              description: row.questionDescription,
              type: row.questionType,
              correct: row.correctOptionId,
              options: [],
            }
          }
          questions[row.questionId].options.push({
            ID: row.optionId,
            description: row.optionDescription,
            image: row.optionImage,
          })
        })

        wsClient.session.test = {
          current: 0,
          questions: Object.values(questions),
        }

        res.send(
          renderToStaticMarkup(
            <Question
              question={
                wsClient.session.test.questions[wsClient.session.test.current]
              }
            />
          )
        )
      })
    })
    .post('/question/next', (req, res) => {
      // TODO there it needs to wait for second player

      const { answer, questionId, duoTestId } = req.session.answer
      const client = getClient(websocket, req)
      client.session.test.current += 1
      const { current, questions } = client.session.test

      client.send(
        renderToStaticMarkup(
          <Question
            question={questions[current]}
            last={current === questions.length - 1}
          />
        )
      )

      const query = `
        INSERT INTO AnswerDuo (questionID, duoTestId, qOptionId)
        VALUES (?, ?, ?);
    `

      database.query(query, [questionId, duoTestId, answer], (err, result) => {
        if (err) {
          res.status(500).send('Error inserting into AnswerSolo')
          console.error(err.message)
        } else {
          console.log('answer added')
        }
      })

      res.sendStatus(204)
    })

    .post('/question/radio', (req, res) => {
      // TODO there it needs to send other players what is selected
      const client = getClient(websocket, req)
      const { current, questions } = client.session.test

      req.session.answer = {
        ...req.session.answer,
        answer: req.body.answer,
        questionId: questions[current].ID,
      }

      if (!req.body.answer) {
        client.send(renderToStaticMarkup(<QuestionSubmit isDisabled={true} />))
        return
      }

      if (current === questions.length - 1) {
        client.send(
          renderToStaticMarkup(<LastQuestionSubmit isDisabled={false} />)
        )
        return
      }

      client.send(renderToStaticMarkup(<QuestionSubmit isDisabled={false} />))

      res.sendStatus(204)
    })

    .post('/question/finish', (req, res) => {
      const client = getClient(websocket, req)

      // TODO go to
      //client.send()

      const { answer, questionId, duoTestId } = req.session.answer
      client.session.test.current += 1

      const queryAnswer = `
        INSERT INTO AnswerDuo (questionID, duoTestId, qOptionId)
        VALUES (?, ?, ?);
    `

      database.query(
        queryAnswer,
        [questionId, duoTestId, answer],
        (err, result) => {
          if (err) {
            res.status(500).send('Error inserting into AnswerSolo')
            console.error(err.message)
          } else {
            console.log('answer added')
          }
        }
      )

      const query = `
        SELECT *
        FROM AnswerSolo
        WHERE duoTestId = ?;
      `

      database.query(query, [req.session.answer.duoTestId], (err, results) => {
        if (err) {
          res.status(500).send('Error retrieving answers')
          console.error(err.message)
        } else {
          console.log(
            'Answers for DuoTest ID ' + req.session.answer.duoTestId + ':',
            results
          )
        }
      })

      res.sendStatus(204)
    })

module.exports = duoTestRouter
