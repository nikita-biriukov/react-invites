import React, { useCallback, useEffect, useState } from 'react'
import './index.scss'
import { Success } from './components/Success'
import { Users } from './components/Users'

function App () {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [invitedUsers, setInvitedUsers] = useState([])
  const [isInvitesSent, setIsinvitesSent] = useState(false)

  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then(res => res.json())
      .then(json => setUsers(json.data))
      .catch(console.warn)
      .finally(() => setIsLoading(false))
  }, [])

  const onChangeQuery = useCallback((e) => setQuery(e.target.value), [])

  const handleInviteClick = useCallback((userId) => {
    if (invitedUsers.includes(userId)) {
      setInvitedUsers(prev => prev.filter(id => id !== userId))
    } else {
      setInvitedUsers(prev => [...prev, userId])
    }
  }, [invitedUsers])

  const handleInvitesSent = useCallback(() => (
    isInvitesSent ? setIsinvitesSent(false) : setIsinvitesSent(true)
  ), [isInvitesSent])

  return (
    <div className="App">
      {isInvitesSent
        ? (
          <Success
            invitedUsers={invitedUsers}
            setInvitedUsers={setInvitedUsers}
            handleInvitesSent={handleInvitesSent}
            setQuery={setQuery}
          />
          )
        : (
          <Users
            users={users}
            isLoading={isLoading}
            query={query}
            onChangeQuery={onChangeQuery}
            handleInviteClick={handleInviteClick}
            invitedUsers={invitedUsers}
            handleInvitesSent={handleInvitesSent}
          />
          )
      }
    </div>
  )
}

export default App
