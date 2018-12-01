const mongoose = require('mongoose');

const Room = require('../models/room');

module.exports = {
  check_new_caro_box(data){
    return new Promise(async (resolve, reject) => {
      let room;
      try{
        room = await Room.findOne({_id: data.key}).select({user_1: 1, user_2: 1, playground: 1}).where('playground').slice(0);
      }
      catch(err){

      }

      room.playground.push({
        user: data.user_id,
        row: data.row,
        column: data.column
      })

      await room.save();
      resolve();
    })
  },

  check_win(data){
    // console.log(data.user_id);
    return new Promise(async (resolve, reject) => {
      let room;
      try{
        let room_id = mongoose.Types.ObjectId(data.key);
        room = await Room.aggregate([
          {$match: {_id: room_id}},
          {$unwind: "$playground"},
          {$match: {"playground.user": data.user_id}},
          {$group: {
            "_id": "$_id",
            "playground": {$push: "$playground"}
          }}
        ]);
      }
      catch(err){

      }
      if(room[0] !== undefined){
        let user = {
          id: 0,
          score: 0
        }
        if(data.user_id === 1){
          user.id = 1;
        }
        else{
          user.id = 2;
        }
        this.five_in_a_row(room[0].playground, data.row, data.column, user);
        if(user.score === 5){
          let score = await Room.findOne({_id: data.key}).select('score playground user_1_name user_2_name');
          if(user.id === 1 ){
            score.score.user_1++;
          }
          else score.score.user_2++;
          score.playground = [];
          score.save();
          let result = {
            id: user.id,
            score: score
          }
          resolve(result);
        }
      }
    })
  },

  five_in_a_row(playground, row, col, user, p_row = -1, p_col = -1){
    // console.log('run five_in_a_row', row, col, user, p_row, p_col);
    let exist = playground.filter(check => check.row === row && check.column === col);
    if(user.score === 5){
      return user.score;
    }
    if(exist.length >= 1){
      user.score++;
      // console.log(user.score);
      if(user.score == 5){
        // console.log('win', user.score);
        return user.score;
      }
      if(user.score === 1){
        this.five_in_a_row(playground, row, col-1, user, row, col);
        this.five_in_a_row(playground, row, col+1, user, row, col);
        user.score = user.score !== 5 ? 1 : 5;
        this.five_in_a_row(playground, row+1, col, user, row, col);
        this.five_in_a_row(playground, row-1, col, user, row, col);
        user.score = user.score !== 5 ? 1 : 5;
        this.five_in_a_row(playground, row+1, col-1, user, row, col);
        this.five_in_a_row(playground, row-1, col+1, user, row, col);
        user.score = user.score !== 5 ? 1 : 5;
        this.five_in_a_row(playground, row+1, col+1, user, row, col);
        this.five_in_a_row(playground, row-1, col-1, user, row, col);
        user.score = user.score !== 5 ? 1 : 5;
      }
      else{
        if(p_row != -1 && p_col != -1){
          if(row === p_row){
            let next = col - p_col;
            this.five_in_a_row(playground, row, col+next, user, row, col);
          }
          else if(col === p_col){
            let next = row - p_row;
            this.five_in_a_row(playground, row+next, col, user, row, col);
          }
          else{
            let next_row = row - p_row;
            let next_col = col - p_col;

            this.five_in_a_row(playground, row+next_row, col+next_col, user, row, col);
          }
        }
      }
    }
    return;
  }
}
