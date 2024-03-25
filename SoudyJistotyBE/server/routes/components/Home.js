const React = require('react')
const { useState } = require('react')

const Home = () => {
  const [adminPassword, setAdminPassword] = useState('')

  const onAdminLoginClick = () => {}

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-vcentered">
          <div className="column has-text-centered has-border">
            <form id="admin_pswd">
              <h2 className="title">Adminské rozhranní</h2>
              <p className="subtitle">
                Subtitle explaining the individual test
              </p>
              <input
                className="input is-medium mb-3"
                value={adminPassword}
                onChange={(e) => {
                  setAdminPassword(e.target.value)
                }}
                name="password"
                type="password"
                placeholder="Heslo"
              />
              <button
                onClick={onAdminLoginClick}
                className="button is-primary"
                type="submit"
              >
                Přejít
              </button>
            </form>
          </div>
          <div className="column has-text-centered">
            <h2 className="title">Rozhranní pro respondenty</h2>
            <p className="subtitle">Subtitle explaining the couples test</p>
            <a className="button is-primary" href="/couples-test">
              Přihlásit / Registrovat
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

module.exports = Home
