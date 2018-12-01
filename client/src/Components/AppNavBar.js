import React from 'react'
import PropTypes from 'prop-types'
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap'
import {NavLink as NavBarLink} from 'react-router-dom'
import { connect } from 'react-redux'

import {get_room_info} from '../actions/roomActions'

class AppNavBar extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      collapsed: false
    }
  }

  componentWillMount(){
    const socket = this.props.room.socket;
    const key = JSON.parse(localStorage.getItem('room')).key;
    this.props.get_room_info(key);
  }

  componentDidMount(){

  }

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  out_room = event => {
    localStorage.removeItem('room');
  }

  show_room_score = () => {
    const room_info = this.props.room.room_info;
    if(room_info._id !== undefined){
      return <NavLink>{room_info.user_1_name} {'('+ room_info.score.user_1 +'-'+ room_info.score.user_2 + ')'} {room_info.user_2_name}</NavLink>
      // console.log(room_info)
    }
  }

  render () {
    const room_info = this.props.room.room_info;
    return(
      <Navbar color="light" expand="sm" light>
        <NavbarBrand href='/' className='mr-auto'>Duong-XOXO</NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar}></NavbarToggler>
        <Collapse isOpen={this.state.collapsed} navbar>
          <Nav navbar className='ml-auto'>
            <NavItem>
              {this.show_room_score()}
            </NavItem>
            <NavItem>
              <NavBarLink to='/' onClick={this.out_room}>Out Room</NavBarLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

const mapStateToProps = state => ({
  room: state.room
})

export default connect(mapStateToProps, {get_room_info})(AppNavBar);
