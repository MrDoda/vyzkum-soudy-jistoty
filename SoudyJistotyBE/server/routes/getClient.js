const getClient = (websocket, req) => {
  let wsClient
  websocket.clients.forEach((client) => {
    if (client.session.sessionId === req.session.sessionId) wsClient = client
  })

  return wsClient
}

module.exports = getClient
