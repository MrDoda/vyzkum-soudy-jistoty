const React = require('react')
const DuoQOption = require('./DuoQOption')
const DuoQuestionSubmit = require('./DuoQuestionSubmit')
const DuoLastQuestionSubmit = require('./DuoLastQuestionSubmit')
const DuoQuestion = ({ question, last }) => {
  const qOptions = question.options

  return (
    <div id="question" hx-swap-oob="true">
      <div className="box">
        <p className="subtitle">{question.description}</p>

        {qOptions.map((qOption) => (
          <QOption key={qOption.ID} qOption={qOption} />
        ))}
        {!last && (
          <div className="field mt-6">
            <QuestionSubmit />
          </div>
        )}
        {last && (
          <div className="field mt-6">
            <LastQuestionSubmit />
          </div>
        )}
      </div>
    </div>
  )
}

module.exports = DuoQuestion
