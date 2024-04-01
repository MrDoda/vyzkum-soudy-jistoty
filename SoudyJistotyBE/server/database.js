const mysql = require('mysql2')

let connection

function initializeConnection() {
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // root
    password: 'oskar', // oskar
    database: 'VyzkumSoudyDB',
    port: 3306,
  })

  connection.connect((error) => {
    if (error) {
      console.error('An error occurred while connecting to the DB:', error)
      throw error
    }
    console.log('Connected to the database.')
  })

  process.on('SIGINT', () => {
    if (connection) {
      connection.end((err) => {
        if (err) return console.log('error:' + err.message)
        console.log('Closed the database connection.')
      })
    }
  })
}

const getDb = (isPromise = false) => {
  if (!connection) {
    initializeConnection()
  }

  if (isPromise) {
    return connection.promise()
  }

  return connection
}

module.exports = getDb
