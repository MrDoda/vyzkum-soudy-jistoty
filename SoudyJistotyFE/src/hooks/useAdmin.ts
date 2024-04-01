import { request } from '../api/genericPost.ts'
import { appStore, TestGroup, User } from '../store/appStore.ts'
import { useState } from 'react'

export const useAdmin = () => {
  const [groupUsers, setGroupUsers] = useState<Array<User>>([])
  const loginAdmin = async (password: string) => {
    const [error, response] = await request('admin', { password })
    if (error || !response) {
      console.error('admin login_error', error)
      return false
    }

    console.log('admin', response)

    localStorage.setItem('isAdmin', response.password)
    return true
  }

  const getGroups = async () => {
    const [error, response] = await request('admin/groups')
    if (error || !Array.isArray(response)) {
      console.error('getGroups error', error)
      return
    }
    appStore.setState({ groups: response })
    console.log('getGroups', response)
  }

  const createGroup = async (groupName: string) => {
    const [error, res] = await request('admin/groups/create', {
      groupName,
    })
    console.log(error, res)
    if (error) {
      console.error('createGroup error', error)
      return
    }
    await getGroups()
  }

  const getGroupUsers = async (group: Partial<TestGroup>) => {
    console.log('XXXXX')
    const [error, response] = await request(`admin/groups/users`, group)
    if (error || !Array.isArray(response)) {
      console.error('getGroupUsers error', error)
      return
    }
    setGroupUsers(response)
    console.log('getGroups', response)
  }

  const updateGroup = async (newGroup: Partial<TestGroup>) => {
    const [error, res] = await request('admin/groups/update', newGroup)
    console.log(error, res)
    if (error) {
      console.error('updateGroup error', error)
      return
    }
    await getGroups()
  }

  return {
    loginAdmin,
    getGroups,
    createGroup,
    updateGroup,
    groupUsers,
    getGroupUsers,
  }
}
