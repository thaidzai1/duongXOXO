import { GET_ROOM, JOIN_ROOM, JOIN_REALTIME, GET_ROOM_INFO, UPDATE_SCORE } from '../actions/types'

const initialState = {
  room: '',
  username: '',
  socket: {},
  room_info: {}
}

export default function(state = initialState, action){
  switch(action.type){
    case GET_ROOM:
      return {
        ...state,
        room: action.payload.key
      }
    case JOIN_ROOM:
      localStorage.setItem('room', JSON.stringify(action.payload));
      return {
        ...state,
        room: action.payload.key,
        username: action.payload.user_id
      }
    case JOIN_REALTIME:
      return {
        ...state,
        socket: action.payload
      }
    case GET_ROOM_INFO:
      return {
        ...state,
        room_info: action.payload
      }
    case UPDATE_SCORE:
      return {
        ...state,
        room_info: action.payload
      }
    default:
      return state;
  }
}
