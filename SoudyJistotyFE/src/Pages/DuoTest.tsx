import { useEffect, useState } from 'react'
import { Question, Subject2 } from '../types/types.ts'
import { useNavigate } from 'react-router-dom'
import BoolQuestion from '../Components/BoolQuestion.tsx'
import AnalogiesQuestion from '../Components/AnalogiesQuestion.tsx'
import SelfEvalSlider from '../Components/SelfEvalSlider.tsx'
import { Pages } from '../store/pages.ts'
import { useDuoTests } from '../hooks/useDuoTests.ts'
import { FourQuestion } from '../Components/FourQuestion.tsx'
import { PictureQuestion } from '../Components/PictureQuestion.tsx'
import { Spinner } from '../Components/Spinner.tsx'

let isLoading = false

const questionComponents = {
  bool: BoolQuestion,
  anatext: AnalogiesQuestion,
  alltext: FourQuestion,
  image: PictureQuestion,
}

export const DuoTest = () => {
  const {
    getCurrentQuestion,
    isTestRunning,
    setCurrentQuestion,
    createDuoTest,
    compareAnswers,
  } = useDuoTests()

  const [question, setQuestion] = useState<Question>()
  const [selfEval, setSelfEval] = useState<number>()
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [selectedAnswer, setSelectedAnswer] = useState<{
    answerId: number
    answer: string
  }>()
  const [showSlider, setShowSlider] = useState<boolean>(false)
  const [subject2, setSubject2] = useState<Subject2>()
  const [showCompare, setShowCompare] = useState<boolean>(false)
  const [displayTime, setDisplayTime] = useState<string>('2:00')
  const [endTime, setEndTime] = useState<any>(null)

  const [waitForSubject2, setWaitForSubject2] = useState<boolean>(false)

  const navigate = useNavigate()

  const waitForSubject = () => {
    setWaitForSubject2(true)

    const randomTime = Math.floor(Math.random() * 2000)

    setTimeout(() => {
      setWaitForSubject2(false)
    }, randomTime)
  }

  const onAnswer = async () => {
    waitForSubject()
    if (subject2 && subject2?.answerId === selectedAnswer?.answerId) {
      return onFinalAnswer()
    }
    setShowCompare(true)
    setShowSlider(false)
    if (!endTime) {
      startTimer()
    }
  }

  const onFinalAnswer = async () => {
    if (!question || !subject2 || !selectedAnswer || !selfEval) return

    await setCurrentQuestion({
      question,
      answerId: selectedAnswer.answerId,
      trustScale: selfEval,
      answer: selectedAnswer.answer,
      isFinal: true,
      subject2: subject2,
    })
    const q = await getCurrentQuestion(navigate, setSubject2)

    setQuestion(q)
    setSelfEval(undefined)
    setSelectedAnswer(undefined)
    setShowSlider(false)
    setShowCompare(false)

    cancelTimer()
  }

  const onLoopAnswer = async () => {
    if (!question || !subject2 || !selectedAnswer || !selfEval) return

    await setCurrentQuestion({
      question,
      answerId: selectedAnswer.answerId,
      trustScale: selfEval,
      answer: selectedAnswer.answer,
      isFinal: false,
      subject2: subject2,
    })
    const q = await getCurrentQuestion(navigate)

    console.log('Q', q)

    setQuestion(q)

    await compareAnswers(setSubject2, selectedAnswer.answerId, subject2, q?.ID!)
    setSelfEval(undefined)
    setSelectedAnswer(undefined)
    setShowSlider(false)
    setShowCompare(false)
  }

  const startTimer = () => {
    const now = Date.now()
    const twoMinutesLater = now + 120000 // 120000 ms = 2 minutes
    setEndTime(twoMinutesLater)
  }

  const cancelTimer = () => {
    setEndTime(null)
    setDisplayTime('2:00')
  }

  useEffect(() => {
    if (!endTime) return

    const interval = setInterval(() => {
      const now = Date.now()
      const secondsLeft = Math.round((endTime - now) / 1000)

      if (secondsLeft <= 0) {
        clearInterval(interval)
        setDisplayTime('0:00')
        setEndTime(null)
        onFinalAnswer()
      } else {
        const minutes = Math.floor(secondsLeft / 60)
        const seconds = secondsLeft % 60
        setDisplayTime(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [endTime])

  useEffect(() => {
    if (!isFirstRender || isLoading) {
      return
    }
    const fetchData = async () => {
      isLoading = true
      if (!(await isTestRunning())) {
        navigate(Pages.WaitStartDuo)
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

    return
  }, [isFirstRender])

  if (!question) return <div>Loading...</div>
  const QuestionComponent = questionComponents[question.type]

  const showQuestion = !showSlider && !showCompare

  const isTimeCritical = () => {
    const [minutes, seconds] = displayTime.split(':').map(Number)
    return minutes === 0 && seconds < 10
  }

  if (waitForSubject2) {
    return <Spinner message="Vyčkejte než druhý z dvojice odpoví..." />
  }
  return (
    <div className="container has-text-centered" style={{ marginTop: '20px' }}>
      {endTime && (
        <div
          className={`timer ${isTimeCritical() ? 'has-text-danger is-size-1' : ''}`}
        >
          Zbývající čas: {displayTime}
        </div>
      )}

      {showQuestion && (
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
      )}
      {showSlider && (
        <SelfEvalSlider
          selfEval={selfEval}
          onSelfEvalChange={setSelfEval}
          onAnswer={onAnswer}
        />
      )}
      {showCompare && !showQuestion && !showSlider && question && selfEval && (
        <>
          <QuestionComponent
            question={question}
            selectedAnswer={selectedAnswer}
            onAnswerChange={() => {}}
            subject2={subject2}
          />
          {subject2?.answerId === selectedAnswer?.answerId && (
            <button
              className="button is-primary mt-3"
              disabled={!selectedAnswer?.answerId}
              onClick={onFinalAnswer}
            >
              Shoda
            </button>
          )}

          {subject2?.answerId !== selectedAnswer?.answerId && (
            <button
              className="button is-primary mt-3"
              disabled={!selectedAnswer?.answerId}
              onClick={onLoopAnswer}
            >
              {'Neshoda -> znovu'}
            </button>
          )}
        </>
      )}
    </div>
  )
}
