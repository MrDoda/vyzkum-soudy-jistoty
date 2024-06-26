import { User } from '../store/appStore.ts'
import { request } from '../api/genericPost.ts'

export const useUser = () => {
  const createUser = async (user: Partial<User>) => {
    const [error, res] = await request('user/create', user)
    if (error) {
      console.error('createUser error', error)
      return false
    }
    localStorage.setItem('SOLO_correctCount', '0')
    localStorage.setItem('SOLO_maxCount', '0')
    localStorage.setItem('DUO_correctCount', '0')
    localStorage.setItem('DUO_maxCount', '0')
    localStorage.setItem('DUO_correctCount_Subject2', '0')
    localStorage.setItem('DUO_maxCount_Subject2', '0')

    localStorage.setItem('userKey', res.userKey)
    localStorage.setItem('seeAnswers', res.seeAnswers)
    return true
  }

  const loginUser = async (userKey: string) => {
    const [error, res] = await request('user/login', { userKey })
    if (error) {
      console.error('loginUser error', error)
      return
    }

    localStorage.setItem('seeAnswers', res.seeAnswers)
    localStorage.setItem('userKey', res.userKey)
    localStorage.setItem('soloTest', res.soloTest)
    localStorage.setItem('duoTest', res.duoTest)
    return res
  }

  const setDemographic = async (demographic: any) => {
    const [error] = await request('user/demo', demographic)
    if (error) {
      console.error('setDemographic error', error)
      return
    }
    return true
  }

  const setAfterTestQuestions = async (afterTestQuestions: any) => {
    const [error] = await request('user/after', afterTestQuestions)
    if (error) {
      console.error('setAfterTestQuestions error', error)
      return
    }
    return true
  }

  const setPandas = async (pandas: any) => {
    const [error] = await request('user/pandas', pandas)
    if (error) {
      console.error('setPandas error', error)
      return
    }
    return true
  }

  return {
    createUser,
    loginUser,
    setDemographic,
    setPandas,
    setAfterTestQuestions,
  }
}
