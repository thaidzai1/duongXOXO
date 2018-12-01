import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'

import HomePage from './HomePage'
import JoinRoom from './JoinRoom/JoinRoom'

class MainPage extends React.Component {

  render () {
    console.log(localStorage.getItem('room'));
    return(
      <BrowserRouter>
        <div className='wrapper'>
          <Route path='/' exact component={JoinRoom}></Route>
          <Route path='/:id' component={HomePage}></Route>
        </div>
      </BrowserRouter>
    )
  }
}

export default MainPage;
