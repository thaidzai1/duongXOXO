const routers = require('express').Router();

routers.use('/room', require('./roomApi'));

module.exports = routers;
