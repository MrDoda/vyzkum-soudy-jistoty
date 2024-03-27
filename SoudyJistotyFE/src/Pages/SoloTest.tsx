import { useTests } from '../hooks/useTests.ts'
import { useEffect, useState } from 'react'
import { Question } from '../types/types.ts'
import { useNavigate } from 'react-router-dom'
import BoolQuestion from '../components/BoolQuestion.tsx'
import SelfEvalSlider from '../components/SelfEvalSlider';

let isLoading = false


//const questionComponents = {
//  bool: BoolQuestion,
//};

export const SoloTest = () => {
  const { getCurrentQuestion, setCurrentAnswer, createSoloTest } = useTests()
  const [question, setQuestion] = useState<Question>()
  const [selfEval, setSelfEval] = useState<number>(50)
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [showSlider, setShowSlider] = useState<boolean>(false);

  // const QuestionComponent = question ? questionComponents[question.type] : null;
  const navigate = useNavigate()

  const onAnswer  = async () => {
    console.log('onAnswer res:')
    if (!question) return

    const res = await setCurrentAnswer({
      question,
      answerId: selectedAnswer,
      trustScale: selfEval,
      answer: 'nothing yet',
    })
    console.log('onAnswer res:', res)
    setShowSlider(false)
    setIsFirstRender(true)
  }

  useEffect(() => {
    if (!isFirstRender || isLoading) {
      return
    }
    const fetchData = async () => {
      isLoading = true
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

  console.log('LOG', selectedAnswer, isFirstRender)


  return (
    <div className="container has-text-centered" style={{ marginTop: '20px' }}>
      {!showSlider ? (
        <>
          <BoolQuestion question={question} onAnswerChange={setSelectedAnswer} />
          <button
            className="button is-primary mt-3"
            disabled={selectedAnswer === 0}
            onClick={() => setShowSlider(true)}
          >
            Pokračovat
          </button>
        </>
      ) : (
        <SelfEvalSlider selfEval={selfEval} onSelfEvalChange={setSelfEval} onAnswer={onAnswer}/>
      )}
    </div>
  );
}
