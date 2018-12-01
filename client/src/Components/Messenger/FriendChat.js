import React from 'react'
import PropTypes from 'prop-types'

const FriendChat = (props) => {
  return (
    <div className='friend-chat'>
      <p>{props.message.text}</p>
    </div>
  )
}

export default FriendChat
