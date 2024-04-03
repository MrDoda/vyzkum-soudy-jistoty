const express = require('express')
const router = express.Router()

const userRouter = (database) =>
  router
    .post('/create', (req, res) => {
      console.log('/user/create', req.body)

      const { userKey, email, gender } = req.body

      const queryAllowedRegistration =
        'SELECT * FROM UserGroup WHERE allowRegistration = 1;'

      database.query(queryAllowedRegistration, [], (error, results) => {
        if (error || (Array.isArray(results) && results.length < 1)) {
          console.error('Not Allowed registration', error, results)
          return res.sendStatus(403)
        }
        const group = results[0]

        if (group?.groupId && userKey && gender !== undefined) {
          const createUserQuery = `INSERT INTO User (userKey, email, gender, groupId) VALUES ("${userKey}","${
            email || ''
          }", ${gender}, ${group.groupId});`
          database.query(createUserQuery, [], (error, results) => {
            if (error) {
              console.error('User creation Failed', error, results)
              return res.sendStatus(403)
            }
            res.status(201)
            return res.send({ userKey })
          })
        }
      })
    })
    .post('/login', (req, res) => {
      console.log('/user/login', req.body)

      const { userKey } = req.body

      const query = `SELECT * FROM User WHERE userKey = "${userKey}";`
      database.query(query, [], (error, results) => {
        if (error || (Array.isArray(results) && results.length < 1)) {
          console.error('Login Failed', error, results)
          return res.sendStatus(403)
        }
        console.log('Login Successfull', results[0])

        res.status(200)
        return res.send({ userKey })
      })
    })
module.exports = userRouter
