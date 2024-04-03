import { useState } from 'react'
import { useAdmin } from '../hooks/useAdmin.ts'
import { useNavigate } from 'react-router-dom'
import { Pages } from '../store/pages.ts'
import InformedAgreement from '../Components/InformedAgreement.tsx'

export const Home = () => {
  const [adminPassword, setAdminPassword] = useState('')
  const navigate = useNavigate()
  const { loginAdmin } = useAdmin()

  const [isActive, setIsActive] = useState(false)

  const toggleModal = () => {
    setIsActive(!isActive)
  }

  const onAdminLoginClick = async () => {
    if (await loginAdmin(adminPassword)) {
      navigate(Pages.Admin)
    }
  }

  const onLoginClick = async () => {
    toggleModal()
  }

  const onAgreement = () => {
    navigate(Pages.UserCreate)
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-vcentered">
          <div className="column has-text-centered has-border">
            <h2 className="title">Adminské rozhranní</h2>
            <p className="subtitle">Pouze pro administrátora testu</p>
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
            <a onClick={onLoginClick} className="button is-primary">
              Přihlásit / Registrovat
            </a>
          </div>
        </div>
      </div>
      <div className={`modal is-fullwidth ${isActive ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={toggleModal}></div>
        <div className="modal-content">
          <div className="box">
            <h1 className="title">Informovaný souhlas</h1>
            <InformedAgreement />
            <button className="button is-success" onClick={onAgreement}>
              Podepisuji a souhlasím
            </button>
          </div>
        </div>
        <button
          className="modal-close is-large"
          aria-label="Souhlasi s podminkami"
          onClick={toggleModal}
        ></button>
      </div>
    </section>
  )
}
