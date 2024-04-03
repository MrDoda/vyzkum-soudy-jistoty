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
  }

  const createGroup = async (groupName: string) => {
    const [error] = await request('admin/groups/create', {
      groupName,
    })
    if (error) {
      console.error('createGroup error', error)
      return
    }
    await getGroups()
  }

  const getGroupUsers = async (group: Partial<TestGroup>) => {
    const [error, response] = await request(`admin/groups/users`, group)
    if (error || !Array.isArray(response)) {
      console.error('getGroupUsers error', error)
      return
    }
    setGroupUsers(response)
  }

  const updateGroup = async (newGroup: Partial<TestGroup>) => {
    const [error] = await request('admin/groups/update', newGroup)
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
