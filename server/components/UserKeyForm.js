const React = require('react')
const UserKeyFormSubmit = require('./UserKeyFormSubmit')
const UserKeyCheckEmail = require('./UserKeyCheckEmail')

const UserKeyForm = ({ userKey, userKeyConfirm, isChecked, email }) => {
  const error = userKey && userKeyConfirm && userKey !== userKeyConfirm
  return (
    <form
      hx-post="/form/user/userKeySubmit"
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
            hx-post="/form/user/userKeyConfirm"
            hx-target="#submit"
            name="userKey"
            className="input userKey"
            type="text"
            defaultValue={userKey}
            onChange={(e) => setUserKey(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Pro ověření zadejte znovu</label>
        <div className="control">
          <input
            hx-post="/form/user/userKeyConfirm"
            hx-target="#submit"
            name="userKeyConfirm"
            className="input userKey"
            type="text"
            defaultValue={userKeyConfirm}
            onChange={(e) => setUserKeyConfirm(e.target.value)}
          />
        </div>
      </div>
      <UserKeyCheckEmail
        {...{
          isChecked,
          email,
        }}
      />

      <UserKeyFormSubmit
        isDisabled={error || !userKey || !userKeyConfirm}
        error={error}
      />
    </form>
  )
}

module.exports = UserKeyForm
