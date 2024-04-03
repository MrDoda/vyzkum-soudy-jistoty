import { useAdmin } from '../hooks/useAdmin.ts'
import { useEffect } from 'react'
import { TestGroup, User } from '../store/appStore.ts'
import { numberOfQuestionsPerVariant } from '../constants/config.ts'

interface Props {
  group: TestGroup
}

export const Grouplist = ({ group }: Props) => {
  const { groupUsers, getGroupUsers } = useAdmin()

  const refresh = () => {
    getGroupUsers(group)
  }

  useEffect(() => {
    getGroupUsers(group)
  }, [group])

  const getCurrentQType = (progressType: string) => (user: User) => {
    try {
      if (progressType == 'solo') {
        return JSON.parse(user.soloTestVariantOrder)[0]
      }
      if (progressType == 'duo') {
        return JSON.parse(user.duoTestVariantOrder)[0]
      }
    } catch {
      console.error('error parsing progress', user)
    }
    return ''
  }

  const getMaxVariants = (progressType: string) => (user: User) => {
    try {
      if (progressType == 'solo') {
        return JSON.parse(user.soloTestVariantOrder).length - 1
      }
      if (progressType == 'duo') {
        return JSON.parse(user.duoTestVariantOrder).length - 1
      }
    } catch {
      console.error('error parsing progress', user)
    }
    return ''
  }

  const getProgress = (progressType: string) => (user: User) => {
    try {
      if (progressType == 'solo') {
        return Math.floor(
          (JSON.parse(user.soloTestQuestions).length /
            // @ts-ignore
            numberOfQuestionsPerVariant[getCurrentQType('solo')(user)]) *
            100
        )
      }
      if (progressType == 'duo') {
        return Math.floor(
          (JSON.parse(user.duoTestQuestions).length /
            // @ts-ignore
            numberOfQuestionsPerVariant[getCurrentQType('duo')(user)]) *
            100
        )
      }
    } catch {
      console.error('error parsing progress', user)
    }
  }

  return (
    <>
      <h3>
        {group.groupId} | {group.groupName}
      </h3>
      User count: {groupUsers.length} <a onClick={refresh}>Refresh</a>
      <table className="table">
        <thead>
          <tr>
            <td>UserKey</td>
            <td>GroupID</td>
            <td>Gender</td>
            <td>SoloTest</td>
            <td>DuoTest</td>
            <td>Bot Variant</td>
            <td>Created Date</td>
          </tr>
        </thead>
        <tbody>
          {groupUsers.map((user, index) => {
            return (
              <tr key={`${user.userKey}_${index}`}>
                <td>{user.userKey}</td>
                <td>{user.groupId}</td>
                <td>{user.gender}</td>
                <td>
                  {user.soloTestVariant} | {getProgress('solo')(user)}% |{' '}
                  {getCurrentQType('solo')(user)}/{getMaxVariants('solo')(user)}
                </td>
                <td>
                  {user.duoTestVariant} | {getProgress('duo')(user)}% |{' '}
                  {getCurrentQType('duo')(user)}/{getMaxVariants('duo')(user)}
                </td>
                <td>{user.botVariant}</td>
                <td>{new Date(user.createdDate).toLocaleTimeString()}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
