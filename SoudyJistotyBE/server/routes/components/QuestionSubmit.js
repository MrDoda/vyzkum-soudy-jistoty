const React = require('react')
const QuestionSubmit = ({ isDisabled = true }) => (
  <button
    id="questionSubmit"
    hx-swap-oob="true"
    className="button is-primary"
    hx-post="/soloTest/question/next"
    hx-post="/soloTest/question/next"
    disabled={isDisabled}
  >
    Další otázka
  </button>
)

module.exports = QuestionSubmit
