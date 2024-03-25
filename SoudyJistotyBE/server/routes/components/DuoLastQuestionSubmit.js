const React = require('react')

const DuoLastQuestionSubmit = ({ isDisabled = true }) => (
  <button
    id="questionSubmit"
    hx-swap-oob="true"
    className="button is-primary"
    hx-post="/duoTest/question/finish"
    hx-post="/duoTest/question/finish"
    disabled={isDisabled}
  >
    Dokončit test
  </button>
)

module.exports = DuoLastQuestionSubmit
