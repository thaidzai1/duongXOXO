import React from 'react'
import { connect } from 'react-redux'

import MessagePlace from './MessagePlace'
import ChatPlace from './ChatPlace'

class Messenger extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      popup_messenger: false,
      messages: [
        {user_id: 1, text: 'let\'s send message'},
        {user_id: 2, text: 'ok that\'s great'}
      ]
    }

    this.message_box = React.createRef();
  }


  componentDidMount(){
    const socket = this.props.room.socket;
    socket.on('receive chat', data => {
      let messages = this.state.messages;

      messages.push(data);

      var notify_sound = new Audio('./lib/sound/messenger_web.mp3');
      notify_sound.play();

      this.setState({
        messages
      })
    })
  }

  popup_messenger = () => {
    if(!this.state.popup_messenger){
      this.message_box.current.className += ' active_messenger';
    }
    else{
      this.message_box.current.className = 'messenger';
    }
    this.setState({
      popup_messenger: !this.state.popup_messenger
    })
  }

  sendIt = (event, chat_text) => {
    console.log('hello', chat_text.value)
    event.preventDefault();

    if(chat_text.value.trim() !== ''){
      const socket = this.props.room.socket;
      const room = JSON.parse(localStorage.getItem('room'));
      let message = {
        socket_id: socket.id,
        text: chat_text.value,
        user_id: room.user_id,
        key: room.key
      }

      chat_text.value = '';

      let messages = this.state.messages;
      messages.push(message);

      this.setState({
        messages
      })

      socket.emit('chat', message);
    }
  }

  handleSubmitWithTextArea = (event, chat_text) => {
    if(event.which === 13){
      if(event.shiftKey){
      }
      else{
        event.preventDefault();
        this.sendIt(event, chat_text);
      }
    }
  }

  render () {
    console.log(this.props.room);
    return(
      <div className='messenger' ref={this.message_box}>
        <img className='popup_messenger' src="./lib/messenger.svg" onClick={this.popup_messenger} />
        <div className='messenger_box'>
          <MessagePlace messages={this.state.messages}></MessagePlace>
          <ChatPlace ref='chat_place' sendIt={this.sendIt} textAreaSubmit={this.handleSubmitWithTextArea}></ChatPlace>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  room: state.room
})

export default connect(mapStateToProps)(Messenger);
