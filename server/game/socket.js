const Player = require('./player');
const jwt = require('jsonwebtoken');

let gameIds = [];
const games = {};

const socketSetup = (socket) => {
  const player = new Player(socket.username, socket);
  socket.player = player;
  console.log(`${socket.username} is connected via web-socket`);

  socket.on('createGame', () => {
    const game = socket.player.createGame();
    if (game) {
      games[game.id] = game;
      gameIds.push({ id: game.id, host: game.host.username, guest: null });
      socket.game = game;
      socket.emit('createdGame', {
        id: game.id,
        host: game.host.username,
        guest: null,
      });
      socket.broadcast.emit('listGame', gameIds);
    }
  });

  socket.on('joinGame', (gameId) => {
    if (games[gameId] !== undefined) {
      socket.game = games[gameId];
      if (games[gameId].join(socket.player)) {
        gameIds = gameIds.map((game) => {
          if (game.id === gameId) {
            game.guest = socket.player.username;
          }
          return game;
        });
      }
      socket.broadcast.emit('listGame', gameIds);
    }
  });

  socket.on('leaveGame', () => {
    const gameId = socket.player.leaveGame();
    if (gameId !== null) {
      games[gameId] = undefined;
      socket.game = null;
      gameIds = gameIds.filter((game) => game.id !== gameId);
    } else {
      gameIds = gameIds.map((game) => {
        if (game.guest === socket.player.username) {
          game.guest = null;
        }
        return game;
      });
    }
    socket.broadcast.emit('listGame', gameIds);
  });

  socket.on('fetchGames', () => {
    socket.emit('listGame', gameIds);
  });

  socket.on('startGame', () => {
    socket.player.start();
  });

  socket.on('choosePlanePosition', (payload) => {
    socket.player.choosePlanePosition(payload);
  });

  socket.on('shoot', (position) => {
    socket.player.shootAt(position);
    socket.game.nextTurn();
  });

  socket.on('kick', () => {
    if (socket.player.kick()) {
      const gameId = socket.player.game.id;
      gameIds = gameIds.map((game) => {
        if (game.id === gameId) {
          game.guest = null;
        }
        return game;
      });
      socket.broadcast.emit('listGame', gameIds);
    }
  });

  socket.on('disconnect', () => {
    // For the sake of simplicity, clean everything when user is disconnected
    if (socket.player.game) {
      const game = socket.player.game;
      games[game.id] = undefined;
      gameIds = gameIds.filter((g) => g.id !== game.id);
    }
    socket.player.disconnect();
  });
};

const socketAuthenticate = (socket, next) => {
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(
      socket.handshake.query.token,
      process.env.TOKEN_SECRET,
      function (err, user) {
        if (err) return next(new Error('Authentication error'));
        socket.username = user.username;
        next();
      }
    );
  } else {
    next(new Error('Authentication error'));
  }
};

module.exports = { socketSetup, socketAuthenticate };
