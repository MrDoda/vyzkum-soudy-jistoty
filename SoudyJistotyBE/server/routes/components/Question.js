const React = require('react')
const QOption = require('./QOption')
const QuestionSubmit = require('./QuestionSubmit')
const LastQuestionSubmit = require('./LastQuestionSubmit')
const Question = ({ question, last }) => {
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

module.exports = Question
