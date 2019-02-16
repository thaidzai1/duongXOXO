import React from 'react'

const MyChat = (props) => {
  return (
    <div className='mychat'>
      <p>{props.message.text}</p>
    </div>
  )
}

export default MyChat
