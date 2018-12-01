const Room = require('../../models/room');

module.exports = {
  async get_room_info(req, res){
    let room;
    try{
      room = await Room.findOne({_id: req.params.key}).select('user_1_name user_2_name score');
    }
    catch(err){
      return res.status(500).json(err);
    }
    console.log(room);
    return res.status(200).json(room);
  },

  async createRoom(req, res){
    let room = new Room();
    try{
      await room.save();
    }
    catch(err){
      return res.status(500).json({
        status: false,
        message: 'create room failed'
      })
    }

    return res.status(200).json({
      status: true,
      key: room._id
    })
  },

  async joinRoom(req, res){
    let room;
    try{
      room = await Room.findOne({_id: req.params.key});
    } catch(err){
      return res.status(500).json({
        status: false,
        message: 'cannot join room'
      })
    }

    if(room){
      let user_id = room.isActivated ? room.user_2 : room.user_1;
      if(req.body.username !== ''){
        if(room.isActivated){
          room.user_2_name = req.body.username;
        }
        else{
          room.user_1_name = req.body.username;
          room.isActivated = true;
        }
      }
      else{
        if(!room.isActivated){
          room.isActivated = true;
        }
      }

      await room.save();

      return res.status(200).json({
        status: true,
        key: room._id,
        user_id
      })
    }
    else{
      return res.status(404).json({
        status: false,
        message: 'room not found'
      })
    }

  }
}
