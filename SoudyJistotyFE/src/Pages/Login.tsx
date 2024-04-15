import { useState } from 'react'
import { useUser } from '../hooks/useUser.ts'
import { useNavigate } from 'react-router-dom'
import { Pages } from '../store/pages.ts'

export const Login = () => {
  const [editedUserKey, setEditedUserKey] = useState('')
  const [loadedKey, setLoadedKey] = useState('')

  const { loginUser } = useUser()
  const navigate = useNavigate()

  const onLoginClick = async () => {
    const { userKey } = await loginUser(editedUserKey)
    setLoadedKey(userKey)
  }

  const onSoloClick = () => {
    navigate(Pages.SoloTest)
  }

  const onDuoClick = () => {
    navigate(Pages.DuoTest)
  }

  if (loadedKey) {
    return (
      <>
        <div className="field">
          <button onClick={onSoloClick} className="button is-primary">
            Pokračovat v testu pro jednotlivce
          </button>
        </div>
        <br />
        <div className="field">
          <button onClick={onDuoClick} className="button is-primary">
            Pokračovat v testu pro dvojice
          </button>
        </div>
      </>
    )
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
              value={editedUserKey}
              onChange={(e) => setEditedUserKey(e.target.value)}
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
