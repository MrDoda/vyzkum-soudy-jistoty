import React from 'react'
import { Question, Subject2 } from '../types/types'
import { oponentBorder } from './FourQuestion.tsx'
import { useSeeAnswers } from '../hooks/useSeeAnswers.ts'

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

  subject2?: Subject2
  wasCorrect2?: number
  maxCount2?: number
}

const BoolQuestion: React.FC<BoolQuestionProps> = ({
  question,
  onAnswerChange,
  subject2,
  selectedAnswer,
  wasCorrect2,
  maxCount2,
}) => {
  const seeAnswers = useSeeAnswers()
  const trueValue = question.option1Content.includes('TRUE')
    ? question.option1
    : question.option2
  const falseValue = question.option1Content.includes('TRUE')
    ? question.option2
    : question.option1

  let subjectAnswer
  if (subject2) {
    if (subject2.answerId === trueValue) {
      subjectAnswer = ' Pravda'
    }

    if (subject2.answerId === falseValue) {
      subjectAnswer = ' Lež'
    }
  }

  return (
    <div className="container has-text-centered" style={{ marginTop: '20px' }}>
      <div
        className="box"
        style={{ maxWidth: '800px', margin: 'auto', marginBottom: 40 }}
      >
        <p className="is-size-4" style={{ marginBottom: '1rem' }}>
          {question.description}
        </p>
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field answer">
              <label
                htmlFor="trueOption"
                className={'radio cursor'}
                style={{
                  position: 'relative',
                  border:
                    selectedAnswer?.answerId === trueValue
                      ? '1px solid #00d1b2'
                      : subject2 && subject2?.answerId === trueValue
                        ? '1px solid #ffb70f'
                        : '1px solid rgba(0, 0, 0, 0)',
                  borderRadius: 5,
                  paddingRight: 20,
                }}
              >
                <input
                  className="is-checkradio cursor"
                  id="trueOption"
                  type="radio"
                  name="boolQuestion"
                  value="true"
                  checked={selectedAnswer?.answerId === trueValue}
                  onChange={() =>
                    onAnswerChange({
                      answer: 'TRUE',
                      answerId: trueValue,
                    })
                  }
                />

                {' Pravda'}
                {subject2 && subject2?.answerId === trueValue && (
                  <div
                    // @ts-ignore
                    style={{ ...oponentBorder, top: 0 }}
                  >
                    OP
                  </div>
                )}
              </label>
            </div>
            <div className="field answer">
              <label
                htmlFor="falseOption"
                className={'radio cursor'}
                style={{
                  position: 'relative',
                  border:
                    selectedAnswer?.answerId === falseValue
                      ? '1px solid #00d1b2'
                      : subject2 && subject2?.answerId === falseValue
                        ? '1px solid #ffb70f'
                        : '1px solid rgba(0, 0, 0, 0)',
                  borderRadius: 5,
                  paddingRight: 20,
                }}
              >
                <input
                  className="is-checkradio cursor"
                  id="falseOption"
                  type="radio"
                  name="boolQuestion"
                  value="false"
                  checked={selectedAnswer?.answerId === falseValue}
                  onChange={() =>
                    onAnswerChange({
                      answer: 'FALSE',
                      answerId: falseValue,
                    })
                  }
                />
                {' Lež'}
                {subject2 && subject2?.answerId === falseValue && (
                  <div
                    // @ts-ignore
                    style={{ ...oponentBorder, top: 0 }}
                  >
                    O
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>
      </div>
      {subject2 && (
        <div
          className="box"
          style={{ margin: 'auto', width: '50%', marginBottom: '10px' }}
        >
          <span style={{ marginLeft: '10px', marginBottom: '10px' }}>
            Váš oponent označil:
          </span>
          <div className="answer answer-4">
            <label
              className="radio"
              style={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'left',
                position: 'relative',
                border: '1px solid #ffb70f',
                borderRadius: 5,
              }}
            >
              <input type="radio" checked={true} />
              <span style={{ marginLeft: '10px' }}>{subjectAnswer}</span>
              <div
                // @ts-ignore
                style={oponentBorder}
              >
                OP
              </div>
            </label>
          </div>
          {seeAnswers && wasCorrect2 && maxCount2 && (
            <div className="panel">
              Správně odpověděl {wasCorrect2} z {maxCount2} otázek. (
              {Math.floor((wasCorrect2 / maxCount2) * 100)}%)
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default BoolQuestion
