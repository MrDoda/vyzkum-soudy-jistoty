import { request } from '../api/genericPost.ts'
import { Pages } from '../store/pages.ts'
import { Question, SetDuoAnswer, Subject2 } from '../types/types.ts'

export const useDuoTests = () => {
  const isTestRunning = async () => {
    const [error, res] = await request('duo/isRunning')
    if (error) {
      console.error('isTestRunning error', error)
      return false
    }
    return res.isTestRunning
  }

  const createSubject2 = async () => {
    const [error, res] = await request('subject2/createSubject')
    if (error) {
      console.error('createSubject2 error', error)
      return
    }
    return res
  }

  const compareAnswers = async (
    setSubject2: (subject2: Subject2) => void,
    answerId: number,
    subject2: Subject2,
    questionId: number
  ) => {
    const [error, res] = await request('subject2/compareAnswers', {
      answerId,
      subject2,
      questionId,
    })
    if (error) {
      console.error('createSubject2 error', error)
      return
    }
    console.log()
    setSubject2(res.subject2)
    return res
  }

  const createDuoTest = async () => {
    const [error, res] = await request('duo/createDuoTest')
    if (error) {
      console.error('createDuoTest error', error)
      return
    }
    localStorage.setItem('duoTest', res.duoTest)

    await createSubject2()

    return res
  }

  const getSubject2Answer = async (
    setSubject2: (subject2: Subject2) => void,
    question: Question
  ) => {
    const [error, res] = await request('subject2/answer', { question })
    if (error) {
      console.error('getSubject2Answer error', error)
      return
    }
    setSubject2(res.subject2)
    return res
  }

  const getCurrentQuestion = async (
    navigate: (path: string) => void,
    setSubject2?: (subject2: Subject2) => void
  ) => {
    const [error, res] = await request('duo/getCurrentQuestion')
    if (error) {
      console.error('getCurrentQuestion error', error)
      return
    }
    if (res.testFinished) {
      navigate(Pages.FinishedTest)
    }

    if (setSubject2) {
      await getSubject2Answer(setSubject2, res.question as Question)
    }

    return res.question as Question
  }

  const setCurrentQuestion = async (answer: SetDuoAnswer) => {
    const [error, res] = await request('duo/setCurrentQuestion', answer)
    console.log(error, res)
    if (error) {
      console.error('setCurrentQuestion error', error)
      return
    }
    return res
  }

  return {
    isTestRunning,
    createDuoTest,
    getCurrentQuestion,
    setCurrentQuestion,
    compareAnswers,
  }
}
