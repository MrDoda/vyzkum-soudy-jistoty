import { useTests } from '../hooks/useTests.ts'
import { useEffect, useState } from 'react'
import { Question } from '../types/types.ts'
import { useNavigate } from 'react-router-dom'
import BoolQuestion from '../Components/BoolQuestion.tsx'
import AnalogiesQuestion from '../Components/AnalogiesQuestion.tsx'
import SelfEvalSlider from '../Components/SelfEvalSlider.tsx'
import { Pages } from '../store/pages.ts'

let isLoading = false

const questionComponents = {
  bool: BoolQuestion,
  anatext: AnalogiesQuestion,
  alltext: AnalogiesQuestion,
  image: AnalogiesQuestion,
}

export const SoloTest = () => {
  const {
    getCurrentQuestion,
    setCurrentAnswer,
    createSoloTest,
    isTestRunning,
  } = useTests()
  const [question, setQuestion] = useState<Question>()
  const [selfEval, setSelfEval] = useState<number>(50)
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [selectedAnswer, setSelectedAnswer] = useState(0)
  const [showSlider, setShowSlider] = useState<boolean>(false)

  const navigate = useNavigate()

  const onAnswer = async () => {
    console.log('onAnswer res:')
    if (!question) return

    const res = await setCurrentAnswer({
      question,
      answerId: selectedAnswer,
      trustScale: selfEval,
      answer: 'nothing yet',
    })
    console.log('onAnswer res:', res)
    const q = await getCurrentQuestion(navigate)

    setQuestion(q)
    setSelectedAnswer(0)
    setShowSlider(false)
  }

  useEffect(() => {
    if (!isFirstRender || isLoading) {
      return
    }
    const fetchData = async () => {
      isLoading = true
      console.log('test:', await isTestRunning())
      if (!(await isTestRunning())) {
        navigate(Pages.WaitStart)
        isLoading = false
        return
      }
      await createSoloTest()
      const question = await getCurrentQuestion(navigate)
      setQuestion(question)
      console.log('QQQ', question)
      console.log('isFirstRender', isFirstRender)
      isLoading = false
      setIsFirstRender(false)
    }
    fetchData()
  }, [isFirstRender])

  if (!question) return <div>Loading...</div>
  const QuestionComponent = questionComponents[question.type]

  console.log('LOG', selectedAnswer, isFirstRender, question)

  return (
    <div className="container has-text-centered" style={{ marginTop: '20px' }}>
      {!showSlider ? (
        <>
          <QuestionComponent
            question={question}
            onAnswerChange={setSelectedAnswer}
          />
          <button
            className="button is-primary mt-3"
            disabled={selectedAnswer === 0}
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
