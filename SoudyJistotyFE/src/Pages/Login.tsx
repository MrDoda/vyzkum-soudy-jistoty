import { useState } from 'react'
import { useUser } from '../hooks/useUser.ts'
import { useNavigate } from 'react-router-dom'
import { Pages } from '../store/pages.ts'

export const Login = () => {
  const [userKey, setUserKey] = useState('')

  const { loginUser } = useUser()
  const navigate = useNavigate()

  const onLoginClick = () => {
    loginUser(userKey)
    navigate(Pages.WaitStart)
  }

  return (
    <>
      <div className="container box" id="user_key_form">
        <h2 className="title is-4">Přihlašte se svým kódem</h2>
        <div className="field">
          <label className="label">Jedinečný Identifikační kód</label>
          <div className="control">
            <input
              name="userKey"
              className="input userKey"
              type="text"
              value={userKey}
              onChange={(e) => setUserKey(e.target.value)}
            />
          </div>
        </div>

        <div id="submit">
          <div className="field">
            <button onClick={onLoginClick} className="button is-primary">
              Přihlásit se
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
