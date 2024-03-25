const mysql = require('mysql2')

const database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'oskar',
  database: 'VyzkumSoudyDB',
})

database.connect((error) => {
  if (error) {
    console.error('An error occurred while connecting to the DB')
    throw error
  }
  console.log('Connected to the database.')
})

process.on('SIGINT', () => {
  database.end((err) => {
    if (err) return console.log('error:' + err.message)
    console.log('Closed the database connection.')
  })
})

module.exports = database
