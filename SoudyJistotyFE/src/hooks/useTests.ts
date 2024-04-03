import { request } from '../api/genericPost.ts'
import { Question } from '../types/types.ts'
import { Pages } from '../store/pages.ts'

export const useTests = () => {
  const isTestRunning = async () => {
    const [error, res] = await request('test/isRunning')
    if (error) {
      console.error('isTestRunning error', error)
      return false
    }
    return res.isTestRunning
  }

  const getCurrentQuestion = async (navigate: (path: string) => void) => {
    const [error, res] = await request('test/getCurrentQuestion')
    if (error) {
      console.error('getCurrentQuestion error', error)
      return
    }
    if (res.testFinished) {
      navigate(Pages.WaitStartDuo)
    }

    return res.question
  }

  const setCurrentAnswer = async (answer: {
    question: Question
    answerId: number
    answer: any
    trustScale: number
  }) => {
    const [error, res] = await request('test/setCurrentQuestion', answer)
    if (error) {
      console.error('setCurrentAnswer error', error)
      return
    }
    return res
  }

  const createSoloTest = async () => {
    const [error, res] = await request('test/createSoloTest')
    if (error) {
      console.error('createSoloTest error', error)
      return
    }
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
