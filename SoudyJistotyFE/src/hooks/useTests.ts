import { request } from '../api/genericPost.ts'

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

  const getCurrentQuestion = async () => {
    const [error, res] = await request('test/getCurrentQuestion')
    console.log(error, res)
    if (error) {
      console.error('getCurrentQuestion error', error)
      return
    }
    console.log('getCurrentQuestion res', res)
    return res.question
  }

  const setCurrentAnswer = async (answer: {
    answer: number
    selfEval: number
  }) => {
    const [error, res] = await request('test/setCurrentAnswer', answer)
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
    return res
  }

  return {
    isTestRunning,
    getCurrentQuestion,
    setCurrentAnswer,
    createSoloTest,
  }
}
