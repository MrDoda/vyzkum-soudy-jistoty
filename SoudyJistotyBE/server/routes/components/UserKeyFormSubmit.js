const React = require('react')

const UserKeyFormSubmit = ({ isDisabled, error }) => {
  return (
    <div id="submit" hx-target="#submit">
      <div className="field">
        <button className="button is-primary" disabled={isDisabled}>
          Vytvořít a Pokračovat
        </button>
      </div>
      {error && (
        <article className="message is-danger">
          <div className="message-body">Kódy se neshodují!</div>
        </article>
      )}
    </div>
  )
}

module.exports = UserKeyFormSubmit
