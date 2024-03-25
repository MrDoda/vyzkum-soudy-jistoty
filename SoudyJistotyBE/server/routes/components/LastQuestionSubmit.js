const React = require('react')

const LastQuestionSubmit = ({ isDisabled = true }) => (
  <button
    id="questionSubmit"
    hx-swap-oob="true"
    className="button is-primary"
    hx-post="/soloTest/question/finish"
    hx-post="/soloTest/question/finish"
    disabled={isDisabled}
  >
    Dokončit test
  </button>
)

module.exports = LastQuestionSubmit
