import React from 'react'
import { Question } from '../types/types'

interface BoolQuestionProps {
  question: Question
  onAnswerChange: (selectedOptionId: {
    answerId: number
    answer: string
  }) => void

  selectedAnswer?: {
    answerId: number
    answer: string
  }
}

const BoolQuestion: React.FC<BoolQuestionProps> = ({
  question,
  onAnswerChange,
}) => {
  const trueValue = question.option1Content.includes('TRUE')
    ? question.option1
    : question.option2
  const falseValue = question.option1Content.includes('TRUE')
    ? question.option2
    : question.option1

  return (
    <div className="container has-text-centered" style={{ marginTop: '20px' }}>
      <div className="box" style={{ maxWidth: '800px', margin: 'auto' }}>
        <p className="is-size-4" style={{ marginBottom: '1rem' }}>
          {question.description}
        </p>
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field answer">
              <label htmlFor="trueOption" className={'radio cursor'}>
                <input
                  className="is-checkradio cursor"
                  id="trueOption"
                  type="radio"
                  name="boolQuestion"
                  value="true"
                  onChange={() =>
                    onAnswerChange({
                      answer: 'TRUE',
                      answerId: trueValue,
                    })
                  }
                />

                {' Pravda'}
              </label>
            </div>
            <div className="field answer">
              <label htmlFor="falseOption" className={'radio cursor'}>
                <input
                  className="is-checkradio cursor"
                  id="falseOption"
                  type="radio"
                  name="boolQuestion"
                  value="false"
                  onChange={() =>
                    onAnswerChange({
                      answer: 'FALSE',
                      answerId: falseValue,
                    })
                  }
                />
                {' Lež'}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoolQuestion
