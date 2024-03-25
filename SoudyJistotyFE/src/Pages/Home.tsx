import { useState } from 'react'
import { useAdmin } from '../hooks/useAdmin.ts'
import { useNavigate } from 'react-router-dom'
import { Pages } from '../store/pages.ts'

export const Home = () => {
  const [adminPassword, setAdminPassword] = useState('')
  const navigate = useNavigate()
  const { loginAdmin } = useAdmin()

  const onAdminLoginClick = async () => {
    if (await loginAdmin(adminPassword)) {
      navigate(Pages.Admin)
    }
  }

  const onLoginClick = async () => {
    navigate(Pages.UserCreate)
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-vcentered">
          <div className="column has-text-centered has-border">
            <h2 className="title">Adminské rozhranní</h2>
            <p className="subtitle">Subtitle explaining the individual test</p>
            <input
              className="input is-medium mb-3"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              name="password"
              type="password"
              placeholder="Heslo"
            />
            <button onClick={onAdminLoginClick} className="button is-primary">
              Přejít
            </button>
          </div>
          <div className="column has-text-centered">
            <h2 className="title">Rozhranní pro respondenty</h2>
            <p className="subtitle">Subtitle explaining the couples test</p>
            <a onClick={onLoginClick} className="button is-primary">
              Přihlásit / Registrovat
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
