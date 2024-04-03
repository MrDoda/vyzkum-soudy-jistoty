import React from 'react'
import { Question, Subject2 } from '../types/types'
import { shuffleArray } from '../utils/utils.ts'
import { oponentBorder } from './FourQuestion.tsx'

interface AnalogiesQuestionProps {
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
}

let shuffledQuestions: any = {}

const AnalogiesQuestion: React.FC<AnalogiesQuestionProps> = ({
  question,
  onAnswerChange,
  selectedAnswer,
  subject2,
}) => {
  if (!shuffledQuestions[question.ID]) {
    shuffledQuestions = {}
    shuffledQuestions[question.ID] = shuffleArray([
      { answerId: question.option1, answerDesc: question.option1Content },
      { answerId: question.option2, answerDesc: question.option2Content },
      { answerId: question.option3, answerDesc: question.option3Content },
      { answerId: question.option4, answerDesc: question.option4Content },
    ])
  }

  const questions = shuffledQuestions[question.ID]
  let subjectAnswer
  if (subject2) {
    subjectAnswer = questions.find(
      (q: any) => q.answerId === subject2.answerId
    )?.answerDesc
  }

  return (
    <div
      className="container has-text-centered"
      style={{ marginTop: '20px', maxWidth: '800px', margin: 'auto' }}
    >
      <div className="box">
        <p className="is-size-4">{question.description}</p>
        <p className="is-size-4">{`${question.firstWord}  -  ?`}</p>
        <p>"A je k B, jako C je k D" – doplňte analogii</p>
        <div
          className="columns is-mobile is-multiline"
          style={{ justifyContent: 'center' }}
        >
          <div
            className="answers-container"
            style={{ display: 'flex', flexWrap: 'wrap', paddingTop: '20px' }}
          >
            {questions.map(({ answerId, answerDesc }: any) => {
              if (!answerId && !answerDesc) return null

              return (
                <div className="answer answer-4" key={answerId}>
                  <label
                    className="radio"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      border:
                        selectedAnswer?.answerId === answerId
                          ? '1px solid #00d1b2'
                          : subject2 && subject2?.answerId === answerId
                            ? '1px solid #ffb70f'
                            : '1px solid rgba(0, 0, 0, 0)',
                      borderRadius: 5,
                    }}
                  >
                    <input
                      type="radio"
                      name={`question-${answerId}`}
                      value={answerId}
                      onChange={() =>
                        onAnswerChange({
                          answerId: answerId,
                          answer: answerDesc,
                        })
                      }
                      checked={selectedAnswer?.answerId === answerId}
                    />
                    <span style={{ marginLeft: '8px' }}>{answerDesc}</span>
                    {subject2 && subject2?.answerId === answerId && (
                      <div
                        // @ts-ignore
                        style={oponentBorder}
                      >
                        O
                      </div>
                    )}
                  </label>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {subject2 && (
        <div
          className="box"
          style={{ margin: 'auto', maxWidth: '60%', marginBottom: '10px' }}
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
              <input type="radio" checked={true} onChange={() => {}} />
              <span style={{ marginLeft: '10px' }}>{subjectAnswer}</span>
              <div
                // @ts-ignore
                style={oponentBorder}
              >
                OP
              </div>
            </label>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnalogiesQuestion
