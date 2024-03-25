const React = require('react')

const UserKeyCheckEmail = ({ isChecked, email, emailConfirm }) => {
  return (
    <div className="field" id={'email'}>
      <div className="field">
        <div className="control">
          <label htmlFor="isChecked" className="checkbox">
            <input
              hx-post="/form/user/userKeyEmail"
              hx-target="#email"
              type="checkbox"
              name="isChecked"
              id="isChecked"
              hx-trigger="click"
              defaultChecked={isChecked}
            />
            Souhlasím s odesláním Kódu na Email. Na tento email Vám také bude
            odeslána cena pokud vyhrajete.
          </label>
        </div>
      </div>

      {isChecked && (
        <>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                hx-post="/form/user/userKeyEmailConfirm"
                hx-target="#email-error"
                hx-trigger="blur"
                hx-swap="innerHTML"
                className="input"
                type="email"
                name="email"
                defaultValue={email}
                placeholder="např. alex@example.com"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Pro ověření emailu zadejte znovu.</label>
            <div className="control">
              <input
                hx-post="/form/user/userKeyEmailConfirm"
                hx-target="#email-error"
                hx-trigger="blur"
                hx-swap="innerHTML"
                className="input"
                type="email"
                name="emailConfirm"
                defaultValue={emailConfirm}
                placeholder="např. alex@example.com"
              />
            </div>
          </div>
          <div id="email-error" />
        </>
      )}
    </div>
  )
}

module.exports = UserKeyCheckEmail
