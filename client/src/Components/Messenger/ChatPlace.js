import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, FormGroup } from 'reactstrap'

class ChatPlace extends React.Component {

  render () {
    return (
      <div className='chat_place'>
        <Form onSubmit={event => this.props.sendIt(event, this.refs.chat_text)}>
          <FormGroup>
            <textarea className='textarea' ref='chat_text' onKeyPress={event => this.props.textAreaSubmit(event, this.refs.chat_text)}></textarea>
            <Button outline color='primary' className='but_send'>Send</Button>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default ChatPlace;
