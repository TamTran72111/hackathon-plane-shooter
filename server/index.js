const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const userRouter = require('./routes/user');
app.use('/', userRouter);
// This endpoint helps client to wake up the heroku server to increase user experience
app.get('/wakeup', (_req, res) => {
  res.status(204).json();
});

const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: ['http://localhost:8080'],
    methods: ['GET', 'POST'],
  },
});

const { socketSetup, socketAuthenticate } = require('./game/socket');
io.use(socketAuthenticate);
io.on('connection', socketSetup);

const PORT = process.env.PORT || 3000;
const DBURL = process.env.DBURL || '';

mongoose
  .connect(DBURL, { useNewUrlParser: true })
  .then(() => {
    console.log('Database is connected');
    http.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Something went wrong: ${err}`);
  });
