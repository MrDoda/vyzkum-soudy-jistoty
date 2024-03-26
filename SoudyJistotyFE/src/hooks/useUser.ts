import { appStore, User } from '../store/appStore.ts'
import { request } from '../api/genericPost.ts'

export const useUser = () => {
  const createUser = async (user: Partial<User>) => {
    const [error, res] = await request('user/create', user)
    console.log(error, res)
    if (error) {
      console.error('createUser error', error)
      return
    }
    console.log('createUser', res.userKey)
    appStore.setState({ headers: { isAdmin: res.userKey } })
  }

  const loginUser = async (userKey: string) => {
    const [error, res] = await request('user/login', { userKey })
    console.log(error, res)
    if (error) {
      console.error('loginUser error', error)
      return
    }
    console.log('loginUser', res.userKey)
    appStore.setState({ headers: { isAdmin: res.userKey } })
  }

  return {
    createUser,
    loginUser,
  }
}
