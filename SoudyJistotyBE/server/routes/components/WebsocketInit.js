const React = require('react')
const WebsocketInit = (ssid) => (
  <section className="section websocket-setup">
    <main className="col-10">
      <div hx-ws="connect:/websocket" hx-vals={`{"ssid":"${ssid}"}`}></div>
      <div id="timeline"></div>
    </main>
    <div id="content"></div>
  </section>
)

module.exports = WebsocketInit
