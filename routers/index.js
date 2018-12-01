const routers = require('express').Router();

routers.use('/api', require('./api/index'));

module.exports = routers;
