require('@babel/register')({
  presets: ['@babel/preset-react'],
})

const express = require('express')

const database = require('./database')
const sessionIDMiddleware = require('./middlewares/sessionId')
const corsMiddleware = require('./middlewares/corsMiddleware')
const sessionMiddleware = require('./middlewares/sessionMiddleWare')
const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')
const testRouter = require('./routes/testRouter')

const app = express()

app.use(express.json())

app.use(sessionMiddleware())
app.use(sessionIDMiddleware)
app.use(corsMiddleware)

app.use('/admin', adminRouter(database))
app.use('/user', userRouter(database))
app.use('/test', testRouter(database))

app.listen(8080, () => {
  console.log(`Server is running on port ${8080}`)
})
