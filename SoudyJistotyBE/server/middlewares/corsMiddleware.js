const cors = require('cors')

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
}

const corsOptionsDelegate = (req, callback) => {
  let corsOptions

  // Add your logic or condition to check the request's origin here
  // For example, to allow any origin:
  const allowlist = ['http://localhost:5173', 'http://example.com'] // Example allowlist

  console.log('Visit from:', req.header('Origin'))

  if (allowlist.indexOf(req.header('Origin')) !== -1 || !req.header('Origin')) {
    corsOptions = { origin: true, credentials: true } // Reflect the request's origin
  } else {
    corsOptions = { origin: true, credentials: true } // Disable CORS for this request
  }

  callback(null, corsOptions) // Callback expects two parameters: error and options
}

module.exports = cors(corsOptionsDelegate)
