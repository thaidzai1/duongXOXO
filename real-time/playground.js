const socket = require('socket.io');

const caroController = require('../controllers/socketCaroController');

module.exports = function(io){
  io.on('connection', socket => {
    socket.on('join room', (data, fn) => {
      // console.log(data);
      if(io.sockets.adapter.rooms[data.key] === undefined){
        socket.join(data.key);
      }
      else if(io.sockets.adapter.rooms[data.key].length < 2){
        socket.join(data.key);
      }
      else{
         fn(false);
      }

      if(io.sockets.adapter.rooms[data.key].length === 2){
        io.sockets.to(data.key).emit('start game', {
          waiting: false
        })
      }
      // console.log(io.sockets.adapter.rooms[data.key].length);
    })

    socket.on('leave room', data => {
      console.log(data);
      socket.leave(data.key);
    })

    socket.on('check caro', async data => {
      console.log(data);
      let check = {
        user_id: data.user_id,
        row: data.row,
        column: data.column
      }
      socket.broadcast.to(data.key).emit('send to openent', check);
      await caroController.check_new_caro_box(data);
      let user_win = await caroController.check_win(data);
      if(user_win.id > 0){
        // console.log(user_win);
        io.sockets.to(data.key).emit('win', user_win);
      }
    })

    socket.on('chat', data => {
      console.log(data);
      socket.broadcast.to(data.key).emit('receive chat', data);
    })
  });
}
