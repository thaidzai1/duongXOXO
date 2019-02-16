import React from 'react'

const FriendChat = (props) => {
  return (
    <div className='friend-chat'>
      <p>{props.message.text}</p>
    </div>
  )
}

export default FriendChat
