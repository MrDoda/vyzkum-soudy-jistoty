import { request } from '../api/genericPost.ts'
import { Pages } from '../store/pages.ts'

export const useDuoTests = () => {
  const createDuoTest = async () => {
    const [error, res] = await request('duo/createTest')
    console.log(error, res)
    if (error) {
      console.error('createDuoTest error', error)
      return
    }
    console.log('createSoloTest res', res)
    localStorage.setItem('duoTest', res.duoTest)

    return res
  }

  const getCurrentQuestion = async (navigate: (path: string) => void) => {
    const [error, res] = await request('duo/getCurrentQuestion')
    console.log(error, res)
    if (error) {
      console.error('getCurrentQuestion error', error)
      return
    }
    if (res.testFinished) {
      navigate(Pages.FinishedTest)
    }

    return res.question
  }

  return {
    createDuoTest,
    getCurrentQuestion,
  }
}
