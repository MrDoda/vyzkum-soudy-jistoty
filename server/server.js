require('@babel/register')({
  presets: ['@babel/preset-react'],
})

const express = require('express')
const React = require('react')
const userRouter = require('./routes/user')

const app = express()
const expressWs = require('express-ws')(app)
const session = require('express-session')
const database = require('./database')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(
  session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
    },
  })
)

// TODO emaily!!!

// websocket setup
const websocket = expressWs.getWss('/websocket')
app.ws('/websocket', function (ws, req) {})

// routes
app.use('/form/user', userRouter(websocket, database))

// server start
app.listen(8080, () => {
  console.log(`Server is running on port ${8080}`)
})
