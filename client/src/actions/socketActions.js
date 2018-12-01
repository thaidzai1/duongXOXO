import { JOIN_ROOM } from './types'
import socketIOClient from 'socket.io-client'

const socket = socketIOClient('http://localhost:5000');

export const join_room = room_id => {
  socket.emit('join_room', room_id);
}
