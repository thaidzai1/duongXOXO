import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class CaroBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      checked: false,
      openent_checked: false
    }
  }

  componentDidMount(){
    const socket = this.props.room.socket;
    socket.on('send to openent', data => {
      if(data.row === this.props.row && data.column === this.props.column){
        this.setState({
          openent_checked: true
        })
      }
      var playground = document.getElementById('playground');
      playground.className = "playground";
      // this.props.isYourTurn();
    })
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.replay !== this.props.replay){
      if(nextProps.replay !== 0){
        this.setState({
          checked: false,
          openent_checked: false
        })
      }
    }
  }

  check_caro_box = () => {
    if(!this.state.openent_checked && !this.state.checked){
      this.setState({
        checked: true
      })
      const room = JSON.parse(localStorage.getItem('room'));
      const socket = this.props.room.socket;
      let data = {
        ...room,
        row: parseInt(this.props.row),
        column: this.props.column
      }
      socket.emit('check caro', data);
      var playground = document.getElementById('playground');
      playground.className += " not_your_turn";
      // this.props.isYourTurn();
    }
  }

  refresh = () => {
    console.log('refresh');
  }

  checked_box = () =>{
    if(this.state.checked){
      return <p>&times;</p>;
    }
    else if(this.state.openent_checked){
      return <p className='openent'>&Omicron;</p>;
    }
    else return '';
  }

  render () {
    return (
      <div className='box' onClick={this.check_caro_box}>
        {this.checked_box()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  room: state.room
})

export default connect(mapStateToProps)(CaroBox);
