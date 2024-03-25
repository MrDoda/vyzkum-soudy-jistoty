const React = require('react')
const DuoQuestionSubmit = ({ isDisabled = true }) => (
  <button
    id="questionSubmit"
    hx-swap-oob="true"
    className="button is-primary"
    hx-post="/duoTest/question/next"
    hx-post="/duoTest/question/next"
    disabled={isDisabled}
  >
    Další otázka
  </button>
)

module.exports = DuoQuestionSubmit
