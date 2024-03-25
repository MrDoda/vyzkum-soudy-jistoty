const React = require('react')
const SoloTest = () => {
  return (
    <div id="soloTest">
      <div id="question">
        <button
          className="button is-primary"
          hx-post="/soloTest/question/init"
          hx-swap="innerHTML"
          hx-target="#question"
          hx-trigger="click"
        >
          Začít první test
        </button>
      </div>
    </div>
  )
}

module.exports = SoloTest
