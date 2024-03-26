import { useTests } from '../hooks/useTests.ts'
import { useEffect, useState } from 'react'
import { Question } from '../types/types.ts'
import { useNavigate } from 'react-router-dom'

let isLoading = false

export const DuoTest = () => {
  const { getCurrentQuestion, setCurrentAnswer, createSoloTest } = useTests()
  const [question, setQuestion] = useState<Question>()
  const [selfEval, setSelfEval] = useState<number>(0)
  const [isFirstRender, setIsFirstRender] = useState(true)

  const navigate = useNavigate()

  const onAnswer = (answer: number) => async () => {
    const selfEv = Math.floor(Math.random() * 100)
    setSelfEval(selfEv)
    if (!question) return

    const res = await setCurrentAnswer({
      question,
      answerId: answer,
      trustScale: selfEv,
      answer: 'nothing yet',
    })
    console.log('onAnswer res:', res)
  }

  useEffect(() => {
    if (!isFirstRender || isLoading) {
      return
    }
    const fetchData = async () => {
      isLoading = true
      await createSoloTest()
      const { question, testFinished } = await getCurrentQuestion(navigate)
      setQuestion(question)
      console.log(question)
      console.log('isFirstRender', isFirstRender)
      isLoading = false
      setIsFirstRender(false)
    }
    fetchData()
  }, [isFirstRender])

  if (!question) return <div>Loading...</div>

  return (
    <div>
      {JSON.stringify(question)}

      <button
        className="button is-primary"
        onClick={onAnswer(question?.option1)}
      >
        Odpovědět
      </button>
      <button
        className="button is-primary"
        onClick={onAnswer(question?.option2)}
      >
        Odpovědět Špatně
      </button>
    </div>
  )
}
