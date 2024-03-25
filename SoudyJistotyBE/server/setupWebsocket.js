const createWebsocket = (expressWs, app) => {
  const websocket = expressWs.getWss('/websocket')
  app.ws('/websocket', function (ws, req) {
    console.log('connected to ws - ' + req.session.sessionId)

    const sessionId = req.session.sessionId
    ws.session = {
      sessionId,
    }

    ws.on('close', function () {
      console.log('WebSocket closed - ', ws.session.sessionId)
    })
  })

  websocket.sendUser = (content, req) =>
    websocket.clients.forEach((client) => {
      if (client.session.sessionId === req.session.sessionId) {
        client.send(content)
      }
    })

  return websocket
}

module.exports = createWebsocket
