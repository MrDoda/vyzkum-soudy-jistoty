const express = require('express')
const router = express.Router()
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const UserKeyForm = require('../components/UserKeyForm')

const userRouter = (websocket) =>
  router
    .post('/', (req, res) => {
      websocket.clients.forEach(function (client) {
        client.send(
          renderToStaticMarkup(
            <div hx-swap-oob="afterbegin:#timeline">
              {JSON.stringify(store.db)}
            </div>
          )
        )
      })
    })
    .post('/userKey', (req, res) => {
      console.log('/userKey', req.body)
      const {} = req.body

      res.send(renderToStaticMarkup(<UserKeyForm />))
    })

module.exports = userRouter
