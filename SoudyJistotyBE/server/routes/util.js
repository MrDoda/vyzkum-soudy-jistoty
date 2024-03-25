const express = require('express')

const utilityRouter = express.Router()

utilityRouter.post('/delete', (req, res) => {
  res.send('')
})

module.exports = utilityRouter
