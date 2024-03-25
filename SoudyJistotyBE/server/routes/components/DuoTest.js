const React = require('react')
const DuoTest = () => {
  return (
    <section className="section" id="dynamicContentArea" hx-swap-oob="true">
      <div id="duoTest">
        <div id="question">
          <button
            className="button is-primary"
            hx-post="/duoTest/question/init"
            hx-swap="innerHTML"
            hx-target="#question"
            hx-trigger="click"
          >
            Začít druhý test
          </button>
        </div>
      </div>
      <div id="notifications"></div>
    </section>
  )
}

module.exports = DuoTest
