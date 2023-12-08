const React = require('react')
const { useState } = React

const UserKeyForm = () => {
  const [userKey, setUserKey] = useState('')
  const [userKeyConfirm, setUserKeyConfirm] = useState('')

  console.log('yee')

  const isButtonEnabled = userKey === userKeyConfirm && userKey.length > 0

  return (
    <form
      hx-post="/form/user/userKey"
      hx-target="#user_key_form"
      hx-swap="outerHTML"
      className="container box"
      id="user_key_form"
    >
      <h2 className="title is-4">
        Vytvořte si svůj jedinečný identifikační kód
      </h2>
      <article className="message is-info">
        <div className="message-body">
          Prosím uložte si tento kód, budete jej ještě potřebovat.
        </div>
      </article>
      <div className="field">
        <label className="label">Jedinečný Identifikační kód</label>
        <div className="control">
          <input
            hx-post="/form/user/userKey"
            name="userKey"
            className="input"
            type="text"
            placeholder="Zadejte jedinečný identifikační kód"
            value={userKey}
            onChange={(e) => setUserKey(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Pro ověření zadejte znovu</label>
        <div className="control">
          <input
            hx-post="/form/user/userKey"
            name="userKeyConfirm"
            className="input"
            type="text"
            placeholder="Zadejte znovu pro ověření"
            value={userKeyConfirm}
            onChange={(e) => setUserKeyConfirm(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <button className="button is-primary" disabled={!isButtonEnabled}>
          Vytvořít a Pokračovat
        </button>
      </div>
    </form>
  )
}

module.exports = UserKeyForm
