const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const socket = require('socket.io');

const keys = require('./config/keys');

const app = express();

mongoose.connect(keys.mongodb.dbURI, () => {
  console.log('mongodb is connected');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', require('./routers'));

app.get('/test', (req, res) => {
  res.send('working fine');
})

const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running');
})

var io = socket(server);
const rtime_playground = require('./real-time/playground')(io);
