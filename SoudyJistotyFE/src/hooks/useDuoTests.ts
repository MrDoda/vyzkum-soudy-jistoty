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
    console.log('isTestRunning res', res)
    return res.isTestRunning
  }

  const createSubject2 = async () => {
    const [error, res] = await request('subject2/createSubject')
    console.log(error, res)
    if (error) {
      console.error('createSubject2 error', error)
      return
    }
    console.log('createSubject2 res', res)
    return res
  }

  const createDuoTest = async () => {
    const [error, res] = await request('duo/createDuoTest')
    console.log(error, res)
    if (error) {
      console.error('createDuoTest error', error)
      return
    }
    console.log('createDuoTest res', res)
    localStorage.setItem('duoTest', res.duoTest)

    await createSubject2()

    return res
  }

  const getSubject2Answer = async (
    setSubject2: (subject2: Subject2) => void,
    question: Question
  ) => {
    const [error, res] = await request('subject2/answer', { question })
    console.log(error, res)
    if (error) {
      console.error('getSubject2Answer error', error)
      return
    }
    console.log('getSubject2Answer res', res)
    setSubject2(res.subject2)
    return res
  }

  const getCurrentQuestion = async (
    navigate: (path: string) => void,
    setSubject2: (subject2: Subject2) => void
  ) => {
    const [error, res] = await request('duo/getCurrentQuestion')
    console.log(error, res)
    if (error) {
      console.error('getCurrentQuestion error', error)
      return
    }
    if (res.testFinished) {
      navigate(Pages.FinishedTest)
    }

    await getSubject2Answer(setSubject2, res.question as Question)

    return res.question as Question
  }

  const setCurrentQuestion = async (answer: SetDuoAnswer) => {
    const [error, res] = await request('duo/setCurrentQuestion', answer)
    console.log(error, res)
    if (error) {
      console.error('setCurrentQuestion error', error)
      return
    }
    console.log('setCurrentQuestion res', res)
    return res
  }

  return {
    isTestRunning,
    createDuoTest,
    getCurrentQuestion,
    setCurrentQuestion,
  }
}
