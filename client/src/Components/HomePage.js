import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

import { join_realtime, get_room_info } from '../actions/roomActions'
import AppNavBar from './AppNavBar'
import Playground from './Playground/Playground'
import Messenger from './Messenger/Messenger'
import typewriter from './public/js/anim_waiting_screen.js'

class HomePage extends React.Component {

  state = {
    room_full: false,
    identity: true,
    waiting: true //if run must be true
  }

  async componentWillMount(){
    let room = JSON.parse(localStorage.getItem('room'));
    let socket = await this.props.join_realtime();
    if(room){
      socket.emit('join room', room, confirmation => {
        if(!confirmation){
          this.setState({
            room_full: true
          })
        }
      });
      socket.on('start game', data => {
        this.setState({
          waiting: data.waiting
        })
      })
    }
    else{
      this.setState({
        identity: false
      })
    }
  }

  componentDidMount(){
    // const socket = this.props.room.socket;
    // const key = JSON.parse(localStorage.getItem('room')).key;
    // this.props.get_room_info(key);
  }

  start_game = waiting => {
    this.setState({
      waiting
    })
  }

  waiting_for_oponent = () => {
    if(this.state.waiting){
      return(
        <div className='waiting_screen'>
          <p className='typewriter'>Welcome to my XOXO web game ♥ ♥ </p>
          <p className='typewriter'>My name is Thai Duong and this is my first web game ♥♥♥</p>
          <p className='typewriter'>♥♥♥ Send your code room to play with your friend ♥♥♥</p>
        </div>
      )
    }

    return (
      <div className='homepage'>
        <AppNavBar></AppNavBar>
        <div className='main-content'>
          <Playground></Playground>
          <Messenger></Messenger>
        </div>
      </div>
    )
  }

  render () {
    if(this.state.room_full || !this.state.identity){
      return <Redirect to='/'></Redirect>
    }
    return(
      <div>
        {this.waiting_for_oponent()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  room: state.room
})

export default connect(mapStateToProps, { join_realtime })(HomePage);
