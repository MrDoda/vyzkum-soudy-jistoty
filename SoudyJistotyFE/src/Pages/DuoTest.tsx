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
import { useLocalStorage } from '../hooks/useLocalStorage.ts'
import { useSeeAnswers } from '../hooks/useSeeAnswers.ts'

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

  const [secondDisplayTime, setSecondDisplayTime] = useState<string>('00:30')
  const [secondEndTime, setSecondEndTime] = useState<any>(null)

  const [waitForSubject2, setWaitForSubject2] = useState<boolean>(false)

  const [isLoadingOnLoopAnswer, setIsLoadingOnLoopAnswer] =
    useState<boolean>(false)
  const [isFinalAnswerLoading, setIsFinalAnswerLoading] =
    useState<boolean>(false)

  const [correctCount, setCorrectCount] = useLocalStorage('DUO_correctCount', 0)
  const [maxCount, setMaxCount] = useLocalStorage('DUO_maxCount', 0)

  const [correctCount2, setCorrectCount2] = useLocalStorage(
    'DUO_correctCount_Subject2',
    0
  )
  const [maxCount2, setMaxCount2] = useLocalStorage('DUO_maxCount_Subject2', 0)
  const seeAnswers = useSeeAnswers()

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

    if (secondEndTime) {
      cancelSecondTimer()
    }

    if (!endTime) {
      startTimer()
    }
  }

  const onFinalAnswer = async () => {
    if (!question || !subject2 || !selectedAnswer || !selfEval) return
    if (isFinalAnswerLoading) return
    setIsFinalAnswerLoading(true)

    const { wasCorrect, wasCorrect2 } = await setCurrentQuestion({
      question,
      answerId: selectedAnswer.answerId,
      trustScale: selfEval,
      answer: selectedAnswer.answer,
      isFinal: true,
      subject2: subject2,
    })

    if (wasCorrect) {
      setCorrectCount(correctCount + 1)
    }
    setMaxCount(maxCount + 1)

    if (wasCorrect2) {
      setCorrectCount2(correctCount2 + 1)
    }
    setMaxCount2(maxCount2 + 1)

    const q = await getCurrentQuestion(navigate, setSubject2)

    if (q?.type === 'image') {
      cancelSecondTimer()
      startSecondTimer()
    }

    setQuestion(q)
    setSelfEval(undefined)
    setSelectedAnswer(undefined)
    setShowSlider(false)
    setShowCompare(false)

    cancelTimer()

    setIsFinalAnswerLoading(false)
  }

  const onLoopAnswer = async () => {
    if (!question || !subject2 || !selectedAnswer || !selfEval) return
    if (isLoadingOnLoopAnswer) return
    setIsLoadingOnLoopAnswer(true)

    await setCurrentQuestion({
      question,
      answerId: selectedAnswer.answerId,
      trustScale: selfEval,
      answer: selectedAnswer.answer,
      isFinal: false,
      subject2: subject2,
    })
    const q = await getCurrentQuestion(navigate)

    setQuestion(q)

    await compareAnswers(setSubject2, selectedAnswer.answerId, subject2, q?.ID!)
    setSelfEval(undefined)
    setSelectedAnswer(undefined)
    setShowSlider(false)
    setShowCompare(false)

    setIsLoadingOnLoopAnswer(false)
  }

  const startTimer = () => {
    const now = Date.now()
    const twoMinutesLater = now + 120000 // 120000 ms = 2 minutes
    setEndTime(twoMinutesLater)
  }

  const startSecondTimer = () => {
    const now = Date.now()
    const thirtySecondsLater = now + 30000 // 30000 ms = 30 seconds
    setSecondEndTime(thirtySecondsLater)
  }

  const cancelTimer = () => {
    setEndTime(null)
    setDisplayTime('2:00')
  }

  const cancelSecondTimer = () => {
    setSecondEndTime(null)
    setSecondDisplayTime('00:30') // Reset the second timer display
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
  }, [endTime, onFinalAnswer])

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

  const isSecondTimeCritical = () => {
    const seconds = Number(secondDisplayTime.split(':')[1])
    return seconds < 10
  }

  if (waitForSubject2) {
    return <Spinner message="Vyčkejte než druhý z dvojice odpoví..." />
  }
  return (
    <div className="container has-text-centered" style={{ marginTop: '20px' }}>
      {seeAnswers && (
        <div className="panel">
          Vaše skóre: <br />
          Správně jste odpověděli {correctCount} z {maxCount} otázek. (
          {Math.floor((correctCount / maxCount) * 100)}%)
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

      {endTime && (
        <div
          className={`timer ${isTimeCritical() ? 'has-text-danger is-size-1' : ''}`}
        >
          Zbývající čas: {displayTime}
        </div>
      )}

      {secondEndTime && (
        <div
          className={`second-timer ${isSecondTimeCritical() ? 'has-text-danger is-size-1' : ''}`}
        >
          Zbývající čas: {secondDisplayTime}
        </div>
      )}

      {showCompare && !showQuestion && !showSlider && question && selfEval && (
        <>
          <QuestionComponent
            question={question}
            selectedAnswer={selectedAnswer}
            onAnswerChange={() => {}}
            subject2={subject2}
            wasCorrect2={correctCount2}
            maxCount2={maxCount2}
          />
          {subject2?.answerId === selectedAnswer?.answerId && (
            <button
              className="button is-primary mt-3"
              disabled={!selectedAnswer?.answerId || isFinalAnswerLoading}
              onClick={onFinalAnswer}
            >
              Shoda
            </button>
          )}

          {subject2?.answerId !== selectedAnswer?.answerId && (
            <button
              className="button is-primary mt-3"
              disabled={!selectedAnswer?.answerId || isLoadingOnLoopAnswer}
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
