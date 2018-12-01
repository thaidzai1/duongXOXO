import React from 'react'
import PropTypes from 'prop-types'

const MyChat = (props) => {
  return (
    <div className='mychat'>
      <p>{props.message.text}</p>
    </div>
  )
}

export default MyChat
