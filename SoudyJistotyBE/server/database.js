const mysql = require('mysql2')

const database = mysql.createConnection({
  host: 'mysql-vyzkum-soudy-jistoty-25021.nodechef.com',
  user: 'ncuser_6541',
  password: 'NFSIxHirphQwhB9Ol8RgaQVJkzwXdq',
  database: 'vyzkum-soudy-jistoty',
  port: 2409,
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
