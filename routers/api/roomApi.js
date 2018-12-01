const routers = require('express').Router();

const roomController = require('../../controllers/api/roomController');

routers.post('/', roomController.createRoom);

routers.get('/:key', roomController.get_room_info);

routers.put('/:key', roomController.joinRoom);

module.exports = routers;
