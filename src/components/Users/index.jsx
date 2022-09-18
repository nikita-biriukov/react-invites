/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useMemo } from 'react'
import { Skeleton } from './Skeleton'
import { User } from './User'

export const Users = React.memo(({
  users,
  isLoading,
  query,
  onChangeQuery,
  handleInviteClick,
  invitedUsers,
  handleInvitesSent
}) => {
  const visibleUsers = useMemo(() => users.filter(user => {
    const lowerQuery = query.toLowerCase()
    const fullName = (user.first_name + ' ' + user.last_name).toLowerCase()
    const email = user.email.toLowerCase()

    return fullName.includes(lowerQuery) || email.includes(lowerQuery)
  }), [query, users])

  return (
    <>
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
        <input
          type="text"
          placeholder="Найти пользователя..."
          value={query}
          onChange={(e) => onChangeQuery(e)}
        />
      </div>
      {isLoading
        ? (
        <div className="skeleton-list">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
          )
        : (
        <ul className="users-list">
          {visibleUsers.map(user => (
            <User
              isInvited={invitedUsers.includes(user.id)}
              key={user.id}
              user={user}
              handleInviteClick={handleInviteClick}
            />
          ))}
        </ul>
          )}
      <button
        className="send-invite-btn"
        onClick={handleInvitesSent}
        disabled={invitedUsers.length === 0}
      >
        {`${invitedUsers.length === 0 ? 'Выберите пользовеля' : 'Отправить приглашение'}`}
      </button>
    </>
  )
})
