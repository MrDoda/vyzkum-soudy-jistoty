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

  const [secondDisplayTime, setSecondDisplayTime] = useState<string>('00:30')
  const [secondEndTime, setSecondEndTime] = useState<any>(null)

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

    if (q?.type === 'image') {
      cancelSecondTimer()
      if (!secondEndTime) {
        startSecondTimer()
      }
    }

    setQuestion(q)
    setSelfEval(undefined)
    setSelectedAnswer(undefined)
    setShowSlider(false)
  }

  const startSecondTimer = () => {
    const now = Date.now()
    const thirtySecondsLater = now + 30000 // 30000 ms = 30 seconds
    setSecondEndTime(thirtySecondsLater)
  }
  const cancelSecondTimer = () => {
    setSecondEndTime(null)
    setSecondDisplayTime('00:30') // Reset the second timer display
  }

  useEffect(() => {
    if (!secondEndTime) return // Use effect for the second timer

    const interval = setInterval(() => {
      const now = Date.now()
      const secondsLeft = Math.round((secondEndTime - now) / 1000)

      if (secondsLeft <= 0) {
        clearInterval(interval)
        setSecondDisplayTime('0:00')
        setSecondEndTime(null) // Stop the second timer
        setShowSlider(true)
        if (!selectedAnswer?.answerId) {
          setSelectedAnswer({
            answerId: question?.option3 || -1,
            answer: 'Time expired with no answer selected.',
          })
        }
      } else {
        const seconds = secondsLeft % 60
        setSecondDisplayTime(`00:${seconds < 10 ? '0' : ''}${seconds}`)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [secondEndTime, selectedAnswer, question])

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

  const isSecondTimeCritical = () => {
    const seconds = Number(secondDisplayTime.split(':')[1])
    return seconds < 10
  }

  return (
    <div className="container has-text-centered" style={{ marginTop: '20px' }}>
      {secondEndTime && (
        <div
          className={`second-timer ${isSecondTimeCritical() ? 'has-text-danger is-size-1' : ''}`}
        >
          Zbývající čas: {secondDisplayTime}
        </div>
      )}
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
