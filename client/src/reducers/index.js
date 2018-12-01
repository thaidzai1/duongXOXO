import { combineReducers } from 'redux'
import socketReducer from './socketReducer'
import roomReducer from './roomReducer'

export default combineReducers({
  socket: socketReducer,
  room: roomReducer,
})
