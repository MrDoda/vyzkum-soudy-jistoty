const React = require('react')

const QOption = ({ qOption }) => {
  const { description, image, ID } = qOption
  return (
    <div className="control">
      <label className="radio">
        <input
          hx-post="/soloTest/question/radio"
          hx-trigger="click"
          className="mr-3 mt-2"
          type="radio"
          name="answer"
          value={ID}
        />
        {description}
      </label>
    </div>
  )
}

module.exports = QOption
