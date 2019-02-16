import React from 'react'
import { Redirect } from 'react-router-dom'


import JoinRoomBox from './JoinRoomBox'
import GetRoomBox from './GetRoomBox'

class JoinRoom extends React.Component {
  redirectToPlayGround = () => {
    if(localStorage.getItem('room') !== null){
      let room = JSON.parse(localStorage.getItem('room'));
      return <Redirect to={'/'+ room.key}></Redirect>;
    }
    return (
      <div className='room-container'>
        <div className='room-layout'></div>
        <div className='room-box'>
          <JoinRoomBox></JoinRoomBox>
          <GetRoomBox></GetRoomBox>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div>
        {this.redirectToPlayGround()}
      </div>
    )
  }
}

export default JoinRoom;
