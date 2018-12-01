import React from 'react'
import PropTypes from 'prop-types'
import socketIOClient from 'socket.io-client'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

import { join_realtime, update_score } from '../../actions/roomActions'
import CaroBox from './CaroBox'
import ModalWin from './ModalWin'

class Playground extends React.Component {

  constructor(props){
    super(props);

    this.modal = React.createRef();

    this.state = {
      your_turn: true,
      win: false,
      replay: 0,
      winner_info: {}
    }
  }

  componentWillMount(){
  }

  componentDidMount(){
    window.addEventListener('beforeunload', this.clearStorage);
    const room = JSON.parse(localStorage.getItem('room'));
    if(room){
      if(room.username === 2){
        this.setState({
          your_turn: false
        })
      }
    }
    const socket = this.props.room.socket;
    socket.on('win', data => {
      this.props.update_score(data.score);
      this.setState({
        win: true,
        winner_info: data
      })
    })
  }

  componentWillUnmount(){
    window.removeEventListener('beforeunload', this.clearStorage);
  }

  clearStorage = event => {
    // localStorage.removeItem('room');
    // return event.returnValue = 'Are you sure you want to close?';
  }

  toggle_win = () => {
    this.setState({
      win: !this.state.win
    })
  }

  is_your_turn = () => {
    this.setState({
      your_turn: !this.state.your_turn
    })
  }

  replay = () => {
    this.setState({
      replay: this.state.replay + 1,
      win: false
    })
  }

  displayCaroBox = () => {
    let boxs = [];
    const row = 40, column = 40;
    for(let box = 1; box <= row*column; box++){
      boxs.push(
        <CaroBox
          key={box}
          row={parseInt(box/row)} column={parseInt(box%column-1)}
          replay={this.state.replay}
        ></CaroBox>
      )
    }
    return boxs;
  }

  render () {
    return (
      <div className='playground' id='playground'>
        {this.displayCaroBox()}
        <ModalWin win={this.state.win} toggle={this.toggle_win} replay={this.replay} winnerInfo={this.state.winner_info} ref={this.modal}></ModalWin>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  room: state.room
})

export default connect(mapStateToProps, { join_realtime, update_score })(Playground);
