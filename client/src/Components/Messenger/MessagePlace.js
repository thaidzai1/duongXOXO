import React from 'react'

import MyChat from './MyChat'
import FriendChat from './FriendChat'

class MessagePlace extends React.Component {
  render () {
    const current_id = JSON.parse(localStorage.getItem('room')).user_id;
    return (
      <div className='message_place'>
        {
          this.props.messages.map((message, index) => {
            console.log(message);
            if(message.user_id === current_id){
              return <MyChat key={index} message={message}></MyChat>
            }
            else return <FriendChat key = {index} message={message}></FriendChat>
          })
        }
      </div>
    )
  }
}

export default MessagePlace;
