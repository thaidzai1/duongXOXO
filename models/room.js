const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const play_groundSchema = new Schema ({
  user: Number,
  row: Number,
  column: Number
}, {_id: false})

const roomSchema = new Schema({
  user_1: {
    type: Number,
    default: 1
  },
  user_2: {
    type: Number,
    default: 2
  },
  user_1_name:{
    type: String,
    default: 'unknown user 1'
  },
  user_2_name: {
    type: String,
    default: 'unknown user 2'
  },
  playground: Array(play_groundSchema),
  isActivated: {
    type: Boolean,
    default: false
  },
  score: {
    user_1: {
      type: Number,
      default: 0
    },
    user_2: {
      type: Number,
      default: 0
    }
  },
  player: {
    type: Number,
    default: 0
  }
});

const Room = mongoose.model('room', roomSchema);

module.exports = Room;
