import React from 'react'
import { Question } from '../types/types'

interface BoolQuestionProps {
  question: Question
  onAnswerChange: (selectedOptionId: number) => void
}

const BoolQuestion: React.FC<BoolQuestionProps> = ({
  question,
  onAnswerChange,
}) => {
  console.log('BOOL', question)
  return (
    <div className="container has-text-centered" style={{ marginTop: '20px' }}>
      <div className="box" style={{ maxWidth: '800px', margin: 'auto' }}>
        <p className="is-size-4" style={{ marginBottom: '1rem' }}>
          {question.description}
        </p>
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <input
                className="is-checkradio cursor"
                id="trueOption"
                type="radio"
                name="boolQuestion"
                value="true"
                onChange={() => onAnswerChange(question.option1)}
              />
              <label htmlFor="trueOption" className={'cursor'}>
                {' Pravda'}
              </label>
            </div>
            <div className="field">
              <input
                className="is-checkradio cursor"
                id="falseOption"
                type="radio"
                name="boolQuestion"
                value="false"
                onChange={() => onAnswerChange(question.option2)}
              />
              <label htmlFor="falseOption">{' Lež'}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoolQuestion
