require('@babel/register')({
  presets: ['@babel/preset-react'],
})

const express = require('express')

const getDb = require('./database')
const corsMiddleware = require('./middlewares/corsMiddleware')
const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')
const testRouter = require('./routes/testRouter')
const duoRouter = require('./routes/duoRouter')
const { subject2Router } = require('./routes/subject2Router')

const database = getDb()

const app = express()

app.use(express.json())

app.use(corsMiddleware)

app.use('/admin', adminRouter(database))
app.use('/user', userRouter(database))
app.use('/test', testRouter(database))
app.use('/duo', duoRouter(database))
app.use('/subject2', subject2Router)

app.listen(8080, () => {
  console.log(`Server is running on port ${8080}`)
})
