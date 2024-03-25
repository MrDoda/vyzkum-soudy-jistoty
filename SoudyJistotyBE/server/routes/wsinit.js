const express = require('express')
const { renderToStaticMarkup } = require('react-dom/server')
const React = require('react')
const WebsocketInit = require('./components/WebsocketInit')

const wsInitRouter = express.Router()

wsInitRouter.post('/', (req, res) => {
  console.log('sending to init a websocket')
  console.log(req.session.sessionID)
  console.log(req.session.sessionId)
  res.send(renderToStaticMarkup(<WebsocketInit ssid={req.session.sessionId} />))
})

module.exports = wsInitRouter
