/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react'
import successLogo from '../images/success.png'

export const Success = React.memo(({
  invitedUsers,
  setInvitedUsers,
  handleInvitesSent,
  setQuery
}) => {
  return (
    <div className="success-block">
      <img src={successLogo} alt="Success" />
      <h3>Успешно!</h3>
      <p>{`Приглашение отправлено ${invitedUsers.length} ${invitedUsers.length === 1 ? 'пользователю.' : 'пользоватeлям.'}`}</p>
      <button
        className="send-invite-btn"
        onClick={() => {
          setInvitedUsers([])
          handleInvitesSent()
          setQuery('')
        }}>
        Назад
      </button>
    </div>
  )
})
