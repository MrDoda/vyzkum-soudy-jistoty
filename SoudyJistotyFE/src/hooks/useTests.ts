import { request } from '../api/genericPost.ts'
import { Question } from '../types/types.ts'
import { Pages } from '../store/pages.ts'

export const useTests = () => {
  const isTestRunning = async () => {
    const [error, res] = await request('test/isRunning')
    console.log(error, res)
    if (error) {
      console.error('isTestRunning error', error)
      return
    }
    console.log('isTestRunning res', res)
    return res.isTestRunning
  }

  const getCurrentQuestion = async (navigate: (path: string) => void) => {
    const [error, res] = await request('test/getCurrentQuestion')
    console.log(error, res)
    if (error) {
      console.error('getCurrentQuestion error', error)
      return
    }
    if (res.testFinished) {
      navigate(Pages.WaitStartDuo)
    }

    return res
  }

  const setCurrentAnswer = async (answer: {
    question: Question
    answerId: number
    answer: any
    trustScale: number
  }) => {
    const [error, res] = await request('test/setCurrentQuestion', answer)
    console.log(error, res)
    if (error) {
      console.error('setCurrentAnswer error', error)
      return
    }
    console.log('setCurrentAnswer res', res)
    return res.answer
  }

  const createSoloTest = async () => {
    const [error, res] = await request('test/createSoloTest')
    console.log(error, res)
    if (error) {
      console.error('createSoloTest error', error)
      return
    }
    console.log('createSoloTest res', res)
    localStorage.setItem('soloTest', res.soloTest)

    return res
  }

  return {
    isTestRunning,
    getCurrentQuestion,
    setCurrentAnswer,
    createSoloTest,
  }
}
