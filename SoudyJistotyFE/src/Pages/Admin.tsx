import { useEffect, useMemo, useState } from 'react'
import { useAdmin } from '../hooks/useAdmin.ts'
import { useStore } from '../store/useStore.ts'
import { appStore } from '../store/appStore.ts'
import { Grouplist } from './GroupList.tsx'
import classNames from 'classnames'

export const Admin = () => {
  const [groupId, setSelectedGroupId] = useState<number>()
  const [isCreate, setIsCreate] = useState<boolean>()
  const [newGroupText, setNewGroupText] = useState('')

  const groups = useStore(appStore, 'groups')
  const group = useMemo(
    () => groups.find((gr) => gr.groupId == groupId),
    [groups, groupId]
  )

  const { getGroups, createGroup, updateGroup } = useAdmin()

  const handleGroupCreate = () => {
    createGroup(newGroupText)
  }

  const handleAllowRegistrationToggle = () => {
    updateGroup({ ...group, allowRegistration: !group?.allowRegistration })
  }

  const handleStartToggle = () => {
    updateGroup({ ...group, active: !group?.active })
  }

  const handleDuoToggle = () => {
    updateGroup({ ...group, activeDuo: !group?.activeDuo })
  }

  useEffect(() => {
    getGroups()
  }, [])

  return (
    <div>
      <table className="table is-hoverable cursor">
        <thead>
          <tr>
            <td>ID </td>
            <td>Name</td>
            <td>Created at</td>
            <td>Registration?</td>
            <td>Solo Test Active?</td>
            <td>Duo Test Active?</td>
          </tr>
        </thead>
        <tbody>
          {groups.map((iteratedGroup) => {
            console.log('cs')
            const date = new Date(iteratedGroup.createdDate)
            return (
              <tr
                className={classNames({
                  'is-selected': iteratedGroup.groupId === group?.groupId,
                })}
                key={`grp-${iteratedGroup.groupId}`}
                onClick={() => setSelectedGroupId(iteratedGroup.groupId)}
              >
                <td>{iteratedGroup.groupId}</td>
                <td>{iteratedGroup.groupName}</td>
                <td>
                  {date.toLocaleDateString()} {date.toLocaleTimeString()}
                </td>
                <td>{iteratedGroup.allowRegistration ? 'TRUE' : 'FALSE'}</td>
                <td>{iteratedGroup.active ? 'TRUE' : 'FALSE'}</td>
                <td>{iteratedGroup.activeDuo ? 'TRUE' : 'FALSE'}</td>
              </tr>
            )
          })}
        </tbody>
        {!isCreate && (
          <tfoot>
            <tr>
              <td colSpan={6}>
                <button
                  className={'button is-fullwidth'}
                  onClick={() => {
                    setIsCreate(true)
                  }}
                >
                  Create new group
                </button>
              </td>
            </tr>
          </tfoot>
        )}

        {isCreate && (
          <tfoot>
            <tr>
              <td colSpan={4}>
                <input
                  className="input"
                  value={newGroupText}
                  onChange={(e) => setNewGroupText(e.target.value)}
                  type="text"
                  placeholder="Text input"
                />
              </td>
              <td>
                <button className="button" onClick={handleGroupCreate}>
                  CREATE
                </button>
                <button
                  className="button"
                  onClick={() => {
                    setIsCreate(false)
                  }}
                >
                  X
                </button>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
      <hr />
      {group && !group?.allowRegistration && (
        <button
          className="button is-success"
          onClick={handleAllowRegistrationToggle}
        >
          Allow registrations
        </button>
      )}
      {group && !!group?.allowRegistration && (
        <button
          onClick={handleAllowRegistrationToggle}
          className="button is-danger"
        >
          Stop registrations
        </button>
      )}
      {group && !group?.active && (
        <button className="button is-success" onClick={handleStartToggle}>
          Start Test
        </button>
      )}
      {group && !!group?.active && (
        <>
          Participants may start their tests! -
          <span />
          <button onClick={handleStartToggle} className="button is-danger">
            Stop
          </button>{' '}
        </>
      )}
      {group && !group?.activeDuo && (
        <button className="button is-success" onClick={handleDuoToggle}>
          Start DuoTest
        </button>
      )}
      {group && !!group?.activeDuo && (
        <button onClick={handleDuoToggle} className="button is-danger">
          Stop DuoTest
        </button>
      )}
      {group && <Grouplist group={group} />}
    </div>
  )
}
