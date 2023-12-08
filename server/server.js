require('@babel/register')({
  presets: ['@babel/preset-react'],
})

const express = require('express')
const React = require('react')
const userRouter = require('./routes/user')

const app = express()
const expressWs = require('express-ws')(app)
const session = require('express-session')
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

// websocket setup
const websocket = expressWs.getWss('/websocket')
app.ws('/websocket', function (ws, req) {})

// routes
app.use('/form/user', userRouter(websocket))

app.get('/test', (req, res) => {
  console.log('hello!!')
  // Create a random client string and store it in the session
  if (!req.session.clientId) {
    console.log('Initing id!')
    req.session.clientId = 'client_' + Math.random()
  }

  // Return 'Hello World' as a response
  res.send('Hello World')
})

app.get('/test-2', (req, res) => {
  console.log('hello!!-2')
  if (req.session.clientId) {
    console.log('Session ID from /test-2:', req.session.clientId)
    res.send('Session ID logged in the console')
  } else {
    console.log('no ID!')
    res.send('No session ID found')
  }
})

// server start
app.listen(8080, () => {
  console.log(`Server is running on port ${8080}`)
})
