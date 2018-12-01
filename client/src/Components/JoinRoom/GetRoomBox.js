import React from 'react'
import PropTypes from 'prop-types'
import { Button, InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap'
import { connect } from 'react-redux'

import { get_room } from '../../actions/roomActions'

class GetRoomBox extends React.Component {

  get_private_room = () => {
    console.log('click');
    this.props.get_room();
  }

  render () {
    const {room} = this.props.room;
    console.log(this.props);
    return (
      <div className='get-room'>
        <InputGroup className='show-room-key'>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Room Key</InputGroupText>
          </InputGroupAddon>
          <Input readOnly value={room}/>
        </InputGroup>
        <Button outline color='info' className='but-get-key' onClick={this.get_private_room}>Get Private Room</Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  room: state.room
})

export default connect(mapStateToProps, { get_room })(GetRoomBox);
