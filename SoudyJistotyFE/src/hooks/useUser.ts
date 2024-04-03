import { User } from '../store/appStore.ts'
import { request } from '../api/genericPost.ts'

export const useUser = () => {
  const createUser = async (user: Partial<User>) => {
    const [error, res] = await request('user/create', user)
    if (error) {
      console.error('createUser error', error)
      return false
    }
    localStorage.setItem('userKey', res.userKey)
    return true
  }

  const loginUser = async (userKey: string) => {
    const [error, res] = await request('user/login', { userKey })
    if (error) {
      console.error('loginUser error', error)
      return
    }
    localStorage.setItem('userKey', res.userKey)
  }

  return {
    createUser,
    loginUser,
  }
}
