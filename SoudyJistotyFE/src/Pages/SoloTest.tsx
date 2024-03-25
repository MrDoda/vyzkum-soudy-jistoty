import { useTests } from '../hooks/useTests.ts'
import { useEffect, useState } from 'react'
import { Question } from '../types/types.ts'

let isLoading = false

export const SoloTest = () => {
  const { getCurrentQuestion, setCurrentAnswer, createSoloTest } = useTests()
  const [question, setQuestion] = useState<Question>()
  const [selfEval, setSelfEval] = useState<number>(0)
  const [isFirstRender, setIsFirstRender] = useState(true)

  const onAnswer = (answer: number) => async () => {
    const res = await setCurrentAnswer({
      answer,
      selfEval,
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
      const question = await getCurrentQuestion()
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
