import { useAdmin } from '../hooks/useAdmin.ts'
import { useEffect } from 'react'
import { TestGroup } from '../store/appStore.ts'

interface Props {
  group: TestGroup
}

export const Grouplist = ({ group }: Props) => {
  const { groupUsers, getGroupUsers } = useAdmin()

  useEffect(() => {
    getGroupUsers(group.groupId)
  }, [group])

  return (
    <>
      <h3>
        {group.groupId} | {group.groupName}
      </h3>
      User count: {groupUsers.length}
      <table className="table">
        <thead>
          <tr>
            <td>UserKey</td>
            <td>GroupID</td>
            <td>Gender</td>
            <td>SoloTest Variant</td>
            <td>DuoTest Variant</td>
            <td>Bot Variant</td>
            <td>Created Date</td>
          </tr>
        </thead>
        <tbody>
          {groupUsers.map((user) => {
            return (
              <tr>
                <td>{user.userKey}</td>
                <td>{user.groupId}</td>
                <td>{user.gender}</td>
                <td>{user.soloTestVariant}</td>
                <td>{user.duoTestVariant}</td>
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
