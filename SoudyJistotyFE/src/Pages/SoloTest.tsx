import { useTests } from '../hooks/useTests.ts'
import { useEffect, useState } from 'react'
import { Question } from '../types/types.ts'
import { useNavigate } from 'react-router-dom'
import BoolQuestion from '../Components/BoolQuestion.tsx'
import AnalogiesQuestion from '../Components/AnalogiesQuestion.tsx'
import SelfEvalSlider from '../Components/SelfEvalSlider.tsx'
import { Pages } from '../store/pages.ts'
import { FourQuestion } from '../Components/FourQuestion.tsx'
import { PictureQuestion } from '../Components/PictureQuestion.tsx'

let isLoading = false

const questionComponents = {
  bool: BoolQuestion,
  anatext: AnalogiesQuestion,
  alltext: FourQuestion,
  image: PictureQuestion,
}

export const SoloTest = () => {
  const {
    getCurrentQuestion,
    setCurrentAnswer,
    createSoloTest,
    isTestRunning,
  } = useTests()
  const [question, setQuestion] = useState<Question>()
  const [selfEval, setSelfEval] = useState<number>()
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [selectedAnswer, setSelectedAnswer] = useState<{
    answerId: number
    answer: string
  }>()
  const [showSlider, setShowSlider] = useState<boolean>(false)

  const navigate = useNavigate()

  const onAnswer = async () => {
    if (!question || !selectedAnswer || !selfEval) return

    await setCurrentAnswer({
      question,
      answerId: selectedAnswer.answerId,
      trustScale: selfEval,
      answer: selectedAnswer.answer,
    })
    const q = await getCurrentQuestion(navigate)

    setQuestion(q)
    setSelfEval(undefined)
    setSelectedAnswer(undefined)
    setShowSlider(false)
  }

  useEffect(() => {
    if (!isFirstRender || isLoading) {
      return
    }
    const fetchData = async () => {
      isLoading = true
      if (!(await isTestRunning())) {
        navigate(Pages.WaitStart)
        isLoading = false
        return
      }
      await createSoloTest()
      const question = await getCurrentQuestion(navigate)
      setQuestion(question)
      isLoading = false
      setIsFirstRender(false)
    }
    fetchData()
    return () => {
      isLoading = false
    }
  }, [isFirstRender])

  if (!question) return <div>Loading...</div>
  const QuestionComponent = questionComponents[question.type]

  return (
    <div className="container has-text-centered" style={{ marginTop: '20px' }}>
      {!showSlider ? (
        <>
          <QuestionComponent
            question={question}
            selectedAnswer={selectedAnswer}
            onAnswerChange={setSelectedAnswer}
          />
          <button
            className="button is-primary mt-3"
            disabled={!selectedAnswer?.answerId}
            onClick={() => setShowSlider(true)}
          >
            Pokračovat
          </button>
        </>
      ) : (
        <SelfEvalSlider
          selfEval={selfEval}
          onSelfEvalChange={setSelfEval}
          onAnswer={onAnswer}
        />
      )}
    </div>
  )
}
