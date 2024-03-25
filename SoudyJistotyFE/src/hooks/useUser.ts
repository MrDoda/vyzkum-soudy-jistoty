import { User } from '../store/appStore.ts'
import { request } from '../api/genericPost.ts'

export const useUser = () => {
  const createUser = async (user: Partial<User>) => {
    const [error, res] = await request('user/create', user)
    console.log(error, res)
    if (error) {
      console.error('createUser error', error)
      return
    }
  }

  const loginUser = async (userKey: string) => {
    const [error, res] = await request('user/login', { userKey })
    console.log(error, res)
    if (error) {
      console.error('loginUser error', error)
      return
    }
  }

  return {
    createUser,
    loginUser,
  }
}
