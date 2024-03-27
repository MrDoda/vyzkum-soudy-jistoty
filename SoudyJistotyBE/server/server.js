require('@babel/register')({
  presets: ['@babel/preset-react'],
})

const express = require('express')

const database = require('./database')
const corsMiddleware = require('./middlewares/corsMiddleware')
const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')
const testRouter = require('./routes/testRouter')
const duoRouter = require('./routes/duoRouter')

const app = express()

app.use(express.json())

app.use(corsMiddleware)

app.use('/admin', adminRouter(database))
app.use('/user', userRouter(database))
app.use('/test', testRouter(database))
app.use('/duo', duoRouter(database))

app.listen(8080, () => {
  console.log(`Server is running on port ${8080}`)
})
