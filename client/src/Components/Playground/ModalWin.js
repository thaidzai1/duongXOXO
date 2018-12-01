import React from 'react'
import PropTypes from 'prop-types'
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap'

class ModalWin extends React.Component {
  test = () => {
    console.log('test');
  }

  show_the_winner = () => {
    const info = this.props.winnerInfo;
    if(info.id === 1){
      return (
        <ModalBody>
          <p>{info.score.user_1_name} is the winner</p>
          <p>{info.score.user_2_name} is a loser!!! Boo Booo</p>
        </ModalBody>
      )
    }
    else if(info.id === 2){
      return (
        <ModalBody>
          <p>{info.score.user_2_name} is the winner</p>
          <p>{info.score.user_1_name} is a loser!!! Boo Booo</p>
        </ModalBody>
      )
    }
  }

  render () {
    return (
      <Modal isOpen={this.props.win} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>Modal title</ModalHeader>
        {this.show_the_winner()}
        <ModalFooter>
          <Button color="primary" onClick={this.props.replay}>Replay</Button>{' '}
          <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default ModalWin;
