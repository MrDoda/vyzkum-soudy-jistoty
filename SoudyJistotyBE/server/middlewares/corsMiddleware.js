const cors = require('cors')

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || origin === 'http://localhost:5173') {
      callback(null, true)
    } else {
      callback(null, true)
    }
  },
  credentials: true,
}

module.exports = cors(corsOptions)
