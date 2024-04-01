import { useEffect, useState } from 'react'
import { Question, Subject2 } from '../types/types.ts'
import { useNavigate } from 'react-router-dom'
import BoolQuestion from '../Components/BoolQuestion.tsx'
import AnalogiesQuestion from '../Components/AnalogiesQuestion.tsx'
import SelfEvalSlider from '../Components/SelfEvalSlider.tsx'
import { Pages } from '../store/pages.ts'
import { useDuoTests } from '../hooks/useDuoTests.ts'

let isLoading = false

const questionComponents = {
  bool: BoolQuestion,
  anatext: AnalogiesQuestion,
  alltext: AnalogiesQuestion,
  image: AnalogiesQuestion,
}

export const DuoTest = () => {
  const {
    getCurrentQuestion,
    isTestRunning,
    setCurrentQuestion,
    createDuoTest,
  } = useDuoTests()

  const [question, setQuestion] = useState<Question>()
  const [selfEval, setSelfEval] = useState<number>(50)
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [selectedAnswer, setSelectedAnswer] = useState(0)
  const [showSlider, setShowSlider] = useState<boolean>(false)

  const [subject2, setSubject2] = useState<Subject2>()

  const navigate = useNavigate()

  const onAnswer = async () => {
    console.log('onAnswer res:')
    if (!question || !subject2) return

    const res = await setCurrentQuestion({
      question,
      answerId: selectedAnswer,
      trustScale: selfEval,
      answer: 'nothing yet',
      isFinal: false,
      subject2: subject2,
    })
    console.log('onAnswer res:', res)
    const q = await getCurrentQuestion(navigate, setSubject2)

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
      if (!(await isTestRunning())) {
        navigate(Pages.WaitStart)
        isLoading = false
        return
      }
      await createDuoTest()
      const question = await getCurrentQuestion(navigate, setSubject2)
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
