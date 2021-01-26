const Player = require('./player');

let gameIds = [];
const games = {};

const socketSetup = (socket) => {
  const player = new Player(socket.username, socket);
  socket.player = player;

  socket.on('createGame', () => {
    const game = socket.player.createGame();
    games[game.id] = game;
    gameIds.push(game.id);
    socket.game = game;
    socket.emit('listGame', gameIds);
  });

  socket.on('joinGame', (gameId) => {
    if (games[gameId] !== undefined) {
      socket.game = games[gameId];
      games[gameId].join(socket.player);
    }
  });

  socket.on('leaveGame', () => {
    const gameId = socket.player.leaveGame();
    if (gameId !== null) {
      games[gameId] = undefined;
      socket.game = null;
      gameIds = gameIds.filter((id) => id !== gameId);
      socket.emit('listGame', gameIds);
    }
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

  socket.on('disconnect', () => {
    // For the sake of simplicity, clean everything when user is disconnected
    socket.player.disconnect();
  });
};

const socketAuthenticate = (socket, next) => {
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(
      socket.handshake.query.token,
      process.env.TOKEN_SECRET,
      (err, user) => {
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
