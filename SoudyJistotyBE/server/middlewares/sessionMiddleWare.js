const session = require('express-session')

const sessionMiddleWare = () =>
  session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameHost: false,
      sameSite: 'none',
    },
  })

module.exports = sessionMiddleWare
