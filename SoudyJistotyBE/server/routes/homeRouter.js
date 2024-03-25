const express = require('express')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const Home = require('./components/Home')
const router = express.Router()

router.post('/selection', (req, res) => {
  res.send(renderToStaticMarkup(<Home />))
})

module.exports = router
