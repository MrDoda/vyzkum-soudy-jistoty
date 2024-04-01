import React from 'react'
import { Question } from '../types/types'
import { shuffleArray } from '../utils/utils.ts'

interface FourQuestionQuestionProps {
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

let shuffledQuestions: any = {}

export const FourQuestion: React.FC<FourQuestionQuestionProps> = ({
  question,
  onAnswerChange,
  selectedAnswer,
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

  return (
    <div
      className="container has-text-centered"
      style={{ marginTop: '20px', maxWidth: '800px', margin: 'auto' }}
    >
      <div className="box">
        <p className="is-size-4">{question.description}</p>
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
                      textAlign: 'left',
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
                    <span style={{ marginLeft: '10px' }}>{answerDesc}</span>
                  </label>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
