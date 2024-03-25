const express = require('express')
const router = express.Router()
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const UserKeyForm = require('./components/UserKeyForm')
const UserKeyFormSubmit = require('./components/UserKeyFormSubmit')
const UserKeyCheckEmail = require('./components/UserKeyCheckEmail')
const Notifications = require('./components/Notifications')
const SoloTest = require('./components/SoloTest')

const userRouter = (database, websocket) =>
  router
    .post('/', (req, res) => {
      websocket.clients.forEach(function (client) {
        client.send(
          renderToStaticMarkup(
            <div hx-swap-oob="afterbegin:#timeline">
              {JSON.stringify(store.db)}
            </div>
          )
        )
      })
    })
    .post('/userKey', (req, res) => {
      console.log('/userKey', req.body)
      res.send(renderToStaticMarkup(<UserKeyForm {...req.body} />))
    })
    .post('/userKeyConfirm', (req, res) => {
      console.log('/userKeyConfirm', req.body)
      const { userKey, userKeyConfirm } = req.body

      if (!userKey || !userKeyConfirm || userKey !== userKeyConfirm) {
        res.send(
          renderToStaticMarkup(
            <UserKeyFormSubmit isDisabled error={userKey && userKeyConfirm} />
          )
        )
        return
      }

      res.send(renderToStaticMarkup(<UserKeyFormSubmit isDisabled={false} />))
    })
    .post('/userKeyEmail', (req, res) => {
      console.log('/userKeyEmail', req.body)
      res.send(renderToStaticMarkup(<UserKeyCheckEmail {...req.body} />))
    })
    .post('/userKeyEmailConfirm', (req, res) => {
      console.log('/userKeyConfirm', req.body)
      const { email, emailConfirm } = req.body

      if (!email || !emailConfirm || email !== emailConfirm) {
        console.log('there we go!')
        res.send(
          renderToStaticMarkup(
            <article className="message is-danger">
              <div className="message-body">Emaily se neshodují !</div>
            </article>
          )
        )
        return
      }

      res.send('')
    })
    .post('/userKeySubmit', (req, res) => {
      console.log('/userKeySubmit', req.body)

      const { userKey, userKeyConfirm, email, emailConfirm } = req.body

      if (userKey && userKeyConfirm && userKey !== userKeyConfirm) {
        websocket.clients.forEach((client) => {
          if (client.session.sessionId === req.session.sessionId) {
            client.send(
              renderToStaticMarkup(
                <Notifications msg="Kódy se neshodují" type="error" />
              )
            )
          }
        })
        res.sendStatus(204)
        return
      }

      if (email && emailConfirm && email !== emailConfirm) {
        websocket.clients.forEach((client) => {
          if (client.session.sessionId === req.session.sessionId) {
            client.send(
              renderToStaticMarkup(
                <Notifications msg="Emaily se neshoduji" type="error" />
              )
            )
          }
        })
        res.sendStatus(204)
        return
      }

      const createUser = 'INSERT INTO User (userKey, email) VALUES (?, ?)'

      database.query(createUser, [userKey, email], (error, results) => {
        if (error) {
          console.error('Error inserting new user.')
          websocket.clients.forEach((client) => {
            if (client.session.sessionId === req.session.sessionId) {
              client.send(
                renderToStaticMarkup(
                  <Notifications
                    msg="Uživatel se nevytvořil, prosím zkuste jiný kód nebo to nahlaste paní Králové."
                    type="error"
                  />
                )
              )
            }
          })
        } else {
          console.log('New user added.')
          websocket.clients.forEach((client) => {
            if (client.session.sessionId === req.session.sessionId) {
              client.send(
                renderToStaticMarkup(
                  <Notifications msg="Uživatel vytvořen" type="success" />
                )
              )
            }
          })
        }
      })

      if (!req.session.clientId) {
        req.session.clientId = req.body.userKey
      }

      res.send(renderToStaticMarkup(<SoloTest />))
    })

module.exports = userRouter
