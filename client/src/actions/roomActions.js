import axios from 'axios'
import socketIOClient from 'socket.io-client'

import { GET_ROOM, JOIN_ROOM, JOIN_REALTIME, GET_ROOM_INFO, UPDATE_SCORE }  from './types'

const socket = socketIOClient('http://localhost:5000');

export const get_room = () => dispatch => {
  axios.post('/api/room')
    .then(res => {
      console.log(res.data);
      return dispatch({
        type: GET_ROOM,
        payload: res.data
      })
    })
}

export const join_private_room = (key, room) => dispatch => {
  return new Promise((resolve, reject) => {
    axios.put('/api/room/'+ key, room)
      .then(res => {
        console.log(res.data);
        dispatch({
          type: JOIN_ROOM,
          payload: res.data
        })

        resolve(res.data);
    });
  })
}

export const join_realtime = (key, user_id) => dispatch => {
  // const socket = socketIOClient('http://localhost:5000');
  return new Promise((resolve, reject) => {
    dispatch({
      type: JOIN_REALTIME,
      payload: socket
    })
    resolve(socket);
  })
}

export const get_room_info = key => dispatch => {
  axios.get('/api/room/'+ key)
    .then(res => {
      return dispatch({
        type: GET_ROOM_INFO,
        payload: res.data
      })
    })
}

export const update_score = score => dispatch => {
  return dispatch({
    type: UPDATE_SCORE,
    payload: score
  })
}
