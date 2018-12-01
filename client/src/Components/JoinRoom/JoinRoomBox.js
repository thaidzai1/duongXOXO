import React from 'react'
import PropTypes from 'prop-types'
import { Button, InputGroup, InputGroupText, InputGroupAddon, Input,
  Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup
} from 'reactstrap'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { join_private_room } from '../../actions/roomActions'

class JoinRoomBox extends React.Component {

  state = {
    modal: false,
    room_key: ''
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  join_private_room = async event => {
    event.preventDefault();
    let newRoom = {
      username: this.Username.value
    }
    let success = await this.props.join_private_room(this.RoomKey.value, newRoom);

    if(success.status === true){
      this.setState({
        room_key: success.key
      })
    }
  }

  modal_form = () => {
    if(this.RoomKey.value !== ''){
      return(
        <Form onSubmit={this.join_private_room}>
          <FormGroup>
            <Input innerRef={node => this.Username = node} name='username' placeholder='Think a badass name !!!'/>
          </FormGroup>
          <Button block outline color="success">That's my name !!! Let's play</Button>
        </Form>
      )
    } else {
      return(
        <p>Let me know your room key</p>
      )
    }
  }

  modal = () => {
    if(this.RoomKey){
      return(
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Type a name</ModalHeader>
          <ModalBody>
            {this.modal_form()}
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </Modal>
      )
    }
  }

  render () {
    console.log(this.props);
    if(this.state.room_key !== ''){
      return <Redirect to={'/'+ this.state.room_key}></Redirect>
    }
    return (
      <div className='join-room'>
        <div className='app-name'>
          <h2>
              <span>D</span><span>u</span><span>o</span><span>n</span><span>g</span><span>-</span><span>X</span><span>O</span><span>X</span><span>O</span>
          </h2>
        </div>
        <InputGroup className='input-room-key'>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Join Room's key</InputGroupText>
          </InputGroupAddon>
          <Input innerRef={node => this.RoomKey = node} type='text'/>
        </InputGroup>
        <Button outline color='primary' className='but-join-room' onClick={this.toggle}>Join Room</Button>
        {this.modal()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  room: state.room
})

export default connect(mapStateToProps, { join_private_room })(JoinRoomBox);
