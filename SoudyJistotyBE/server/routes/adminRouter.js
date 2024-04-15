const express = require('express')
const React = require('react')
const { getIsAdmin } = require('../utils/getHeaderValues')

const router = express.Router()

const adminRouter = (database) =>
  router
    .post('/', async (req, res) => {
      console.log('/admin', req.body)

      const { password } = req.body
      if (!password) {
        res.sendStatus(400)
        return
      }

      const adminUserQuery = `SELECT * FROM Admin WHERE password = '${password}'`
      database.query(adminUserQuery, [], (error, results) => {
        if (error || (Array.isArray(results) && results.length < 1)) {
          console.error('Incorrect password', error, results)
          return res.sendStatus(404)
        }

        const adminUser = results[0]
        return res.send(adminUser)
      })
    })

    .post('/groups', async (req, res) => {
      console.log('/groups')
      if (!getIsAdmin(req)) {
        return res.sendStatus(403)
      }

      console.log('admin proved')

      const groupsQuery = `SELECT * FROM UserGroup`
      database.query(groupsQuery, [], (error, results) => {
        if (error || (Array.isArray(results) && results.length < 1)) {
          console.error('no groups', error, results)
          return res.sendStatus(404)
        }

        return res.send(results)
      })
    })
    .post('/groups/create', async (req, res) => {
      console.log('/groups/create', req.body)
      if (!getIsAdmin(req)) {
        return res.sendStatus(403)
      }

      const newGroup = req.body

      console.log('admin proved')

      const groupsQuery = `INSERT INTO UserGroup (groupName) VALUES ('${newGroup.groupName}');`
      database.query(groupsQuery, [], (error, results) => {
        if (error) {
          console.error('creation failed', error, results)
          return res.sendStatus(404)
        }

        return res.send({ status: 201 })
      })
    })

    .post('/groups/update', async (req, res) => {
      console.log('/groups/update', req.body)
      if (!getIsAdmin(req)) {
        return res.sendStatus(403)
      }

      const newGroup = req.body

      const update = `UPDATE UserGroup SET active = ${
        newGroup.active ? 1 : 0
      }, allowRegistration = ${
        newGroup.allowRegistration ? 1 : 0
      } , activeDuo = ${newGroup.activeDuo ? 1 : 0} WHERE groupId = ${
        newGroup.groupId
      };`

      database.query(update, [], (error, results) => {
        if (error) {
          console.error('creation failed', error, results)
          return res.sendStatus(404)
        }

        return res.send({ status: 201 })
      })
    })
    .post('/groups/users', async (req, res) => {
      console.log('/groups/users', req.body)
      if (!getIsAdmin(req)) {
        return res.sendStatus(403)
      }
      const selectedGroup = req.body
      const usersQuery = `SELECT 
    User.*,
    BOT.competence as botCompetence,
    BOT.confidence as botConfidence
FROM 
    User
LEFT JOIN 
    BOT ON BOT.userId = User.userKey
WHERE 
    User.groupId = ${selectedGroup.groupId} 
ORDER BY User.createdDate DESC;
`
      database.query(usersQuery, [], (error, results) => {
        if (error || (Array.isArray(results) && results.length < 1)) {
          console.error('no users', error, results)
          return res.sendStatus(404)
        }

        return res.send(results)
      })
    })

module.exports = adminRouter
