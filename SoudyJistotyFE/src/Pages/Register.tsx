import { useMemo, useState } from 'react'
import { useUser } from '../hooks/useUser.ts'
import { useNavigate } from 'react-router-dom'
import { Pages } from '../store/pages.ts'

export const Register = () => {
  const [userKey, setUserKey] = useState('')
  const [userKeyConfirm, setUserKeyConfirm] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [email, setEmail] = useState('')
  const [emailConfirm, setEmailConfirm] = useState('')
  const [error, setError] = useState('')
  const [gender, setGender] = useState<string>('1')

  const [isKeyChecked, setIsKeyChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { createUser } = useUser()

  const navigate = useNavigate()

  const isDisabled = useMemo(() => {
    if (!userKey) {
      return true
    }

    let disabled = false

    if (!isKeyChecked) {
      setError('Zaškrtněte, že jste si kód uložili.')
      disabled = true
    }

    if (userKey !== userKeyConfirm) {
      setError('Kódy se neshodují!')
      disabled = true
    }

    if (isChecked && email !== emailConfirm) {
      setError('Emaily se neshodují!')
      disabled = true
    }
    if (isChecked && !email) {
      disabled = true
    }

    if (gender === undefined) {
      disabled = true
    }

    if (userKey.length !== 4) {
      setError('Kód musí mít 4 znaky!')
      disabled = true
    }

    if (!disabled) {
      setError('')
    }

    return disabled
  }, [userKey, userKeyConfirm, email, emailConfirm, isKeyChecked])

  const onCreateClick = async () => {
    if (isLoading) return

    setIsLoading(true)
    setError('')
    const isUserCreated = await createUser({
      userKey: `${userKey}_${Math.random()}`,
      email,
      gender: gender != '0',
    })
    if (isUserCreated) {
      navigate(Pages.Demographic)
    }
    setError('Registrace jsou nyní vypnuté.')
    setIsLoading(false)
  }

  return (
    <>
      <div className="container box" id="user_key_form">
        <h2 className="title is-4">
          Vytvořte si svůj jedinečný identifikační kód
        </h2>
        <article className="message is-warning">
          <div className="message-body">
            Zadejte svůj jedinečný kód, složený z PRVNÍCH DVOU písmen příjmení
            vaší matky a POSLEDNÍCH DVOU čísel vašeho rodného čísla
          </div>
        </article>
        <article className="message is-info">
          <div className="message-body">
            Prosím uložte si tento kód, budete jej ještě potřebovat.
          </div>
        </article>

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
        <div className="field">
          <label className="label">Pro ověření zadejte znovu</label>
          <div className="control">
            <input
              name="userKeyConfirm"
              className="input userKey"
              type="text"
              value={userKeyConfirm}
              onChange={(e) => setUserKeyConfirm(e.target.value)}
            />
          </div>
        </div>
        <div className="field" id={'email'}>
          <div className="field">
            <div className="control">
              <label htmlFor="isChecked" className="checkbox">
                <input
                  type="checkbox"
                  name="isChecked"
                  id="isChecked"
                  onChange={() => setIsChecked(!isChecked)}
                  checked={isChecked}
                />
                Souhlasím s odesláním Kódu na Email. Na tento email Vám také
                bude odeslána cena pokud vyhrajete.
              </label>
            </div>
          </div>

          {isChecked && (
            <>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="např. alex@example.com"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">
                  Pro ověření emailu zadejte znovu.
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    name="emailConfirm"
                    value={emailConfirm}
                    onChange={(e) => setEmailConfirm(e.target.value)}
                    placeholder="např. alex@example.com"
                  />
                </div>
              </div>
              <div id="email-error" />
            </>
          )}
        </div>
        <div className="field" id={'gender'}>
          <div className="field">
            <div className="control">
              <label className="label" htmlFor="gender">
                Pohlaví
              </label>

              <div className="select">
                <select
                  name={'gender'}
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value={1}>Žena</option>
                  <option value={0}>Muž</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label htmlFor="isKeyChecked" className="checkbox">
              <input
                type="checkbox"
                name="isKeyChecked"
                id="isKeyChecked"
                onChange={() => setIsKeyChecked(!isKeyChecked)}
                checked={isKeyChecked}
              />
              Kód jsem si uložil.
            </label>
          </div>
        </div>

        <div id="submit">
          <div className="field">
            <button
              onClick={onCreateClick}
              className="button is-primary"
              disabled={isDisabled || isLoading}
            >
              Vytvořit a Pokračovat
            </button>
          </div>
          {error && (
            <article className="message is-danger">
              <div className="message-body">{error}</div>
            </article>
          )}
        </div>
      </div>
    </>
  )
}
