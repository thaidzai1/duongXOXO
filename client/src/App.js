import React, { Component } from 'react';
import {Provider} from 'react-redux'

import store from './store'
import MainPage from './Components/MainPage'
import './App.css';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <MainPage></MainPage>
      </Provider>
    );
  }
}

export default App;
