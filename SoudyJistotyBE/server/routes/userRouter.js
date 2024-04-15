const express = require('express')
const getDb = require('../database')
const { getUserKey } = require('../utils/getHeaderValues')
const router = express.Router()

const dbPromise = getDb(true)

let toggle = 0

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
          const seeAnswers = toggle
          const createUserQuery = `INSERT INTO User (userKey, email, gender, groupId, seeAnswers) VALUES ("${userKey}","${
            email || ''
          }", ${gender}, ${group.groupId}, ${seeAnswers});`
          database.query(createUserQuery, [], (error, results) => {
            if (error) {
              console.error('User creation Failed', error, results)
              return res.sendStatus(403)
            }
            res.status(201)
            toggle = 1 - toggle
            return res.send({ userKey, seeAnswers })
          })
        }
      })
    })
    .post('/login', (req, res) => {
      console.log('/user/login', req.body)

      const { userKey } = req.body

      const query = `SELECT 
    User.*,
    SoloTest.ID AS SoloTestID,
    DuoTest.ID AS DuoTestID
FROM 
    User
LEFT JOIN 
    (SELECT userId, MAX(createdDate) AS MaxCreatedDate FROM SoloTest GROUP BY userId) LatestSoloTest
    ON LatestSoloTest.userId = User.userKey
LEFT JOIN 
    SoloTest 
    ON SoloTest.userId = LatestSoloTest.userId AND SoloTest.createdDate = LatestSoloTest.MaxCreatedDate
LEFT JOIN 
    (SELECT userId, MAX(createdDate) AS MaxCreatedDate FROM DuoTest GROUP BY userId) LatestDuoTest
    ON LatestDuoTest.userId = User.userKey
LEFT JOIN 
    DuoTest 
    ON DuoTest.userId = LatestDuoTest.userId AND DuoTest.createdDate = LatestDuoTest.MaxCreatedDate
WHERE 
    User.userKey LIKE CONCAT('${userKey}', '%')
ORDER BY 
    User.createdDate DESC
LIMIT 1;

`
      database.query(query, [], (error, results) => {
        if (error || (Array.isArray(results) && results.length < 1)) {
          console.error('Login Failed', error, results)
          return res.sendStatus(403)
        }
        console.log('Login Successfull', results[0])

        res.status(200)
        const soloTest = results[0].SoloTestID
        const duoTest = results[0].DuoTestID
        return res.send({
          userKey: results[0].userKey,
          soloTest,
          duoTest,
          seeAnswers: results[0].seeAnswers,
        })
      })
    })
    .post('/demo', async (req, res) => {
      console.log('/user/demo', req.body)
      const userKey = getUserKey(req)
      if (!userKey) {
        console.error('No userKey 403')
        return res.sendStatus(403)
      }
      try {
        const {
          age,
          universityName,
          studyProgram,
          yearOfStudy,
          studioType,
          personalUJEP = '',
          userUJEPid = '',
        } = req.body

        const sql = `INSERT INTO UserDemo (userId, age, universityName, studyProgram, yearOfStudy, studioType, personalUJEP, userUJEPid) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        const results = await dbPromise.execute(sql, [
          userKey,
          age,
          universityName,
          studyProgram,
          yearOfStudy,
          studioType,
          personalUJEP,
          userUJEPid,
        ])

        return res.send({ ok: true })
      } catch (error) {
        console.error('Error inserting user demo data.', error)
        return res.sendStatus(405)
      }
    })
    .post('/pandas', async (req, res) => {
      console.log('/user/pandas', req.body)
      const userKey = getUserKey(req)
      if (!userKey) {
        console.error('No userKey 403')
        return res.sendStatus(403)
      }

      try {
        const pandas = JSON.stringify(req.body)
        const sql = `INSERT INTO UserPandas (userId, pandas) VALUES (?, ?)`
        const results = await dbPromise.execute(sql, [userKey, pandas])

        return res.send({ ok: true })
      } catch (error) {
        console.error('Error inserting user pandas data.', error)
        return res.sendStatus(500)
      }
    })
    .post('/after', async (req, res) => {
      console.log('/user/after', req.body)
      const userKey = getUserKey(req)
      if (!userKey) {
        console.error('No userKey 403')
        return res.sendStatus(403)
      }

      try {
        const { theoryOfCertainty, preStudy, decisionBasis } = req.body

        const sql = `INSERT INTO AfterTestQuestions (userId, theoryOfCertainty, preStudy, decisionBasis)
                 VALUES (?, ?, ?, ?)`
        const results = await dbPromise.execute(sql, [
          userKey,
          theoryOfCertainty,
          preStudy,
          decisionBasis,
        ])

        return res.send({ ok: true })
      } catch (error) {
        console.error('Error inserting user after data.', error)
        return res.sendStatus(405)
      }
    })

module.exports = userRouter
