const { ONLINE, READY, INVALID } = require('./constant');
const Game = require('./game');
const Sky = require('./sky');

class Player {
  constructor(username, socket) {
    this.username = username;
    this.socket = socket;
    this.status = ONLINE;
    this.sky = null;
  }

  createGame() {
    this.game = new Game(this);
    return this.game;
  }

  joinGame(game) {
    return game.join(this);
  }

  leaveGame() {
    let gameId = null;
    if (this.game) {
      gameId = this.game.leave();
    }
    this.game = null;
    return gameId;
  }

  start() {
    if (this.game) {
      this.game.start(this);
    }
  }

  choosePlanePositions() {
    this.sky = new Sky();
    this.socket.emit('choosePlanePositions');
  }

  isReady() {
    return this.status === READY;
  }

  choosePlanePosition(payload) {
    if (this.sky.placePlane(payload) === false) {
      this.socket.emit('invalidPlanePosition');
    }
    if (this.sky.planes.length === 3) {
      this.status = READY;
      this.game.fight();
    }
  }

  chooseShootingPosition() {
    this.socket.emit('chooseShootingPosition');
  }

  waitForTurn() {
    this.socket.emit('waitForTurn');
  }

  shootAt(position) {
    try {
      const result = this.game.shoot(this, position);
      this.socket.emit('shootResult', result);
    } catch (error) {
      if (error === INVALID) {
        this.socket.emit('invalidShootingPosition');
      }
    }
  }

  beShotAt(position) {
    const result = this.sky.shoot(position);
    this.socket.emit('beShotResult', result);
    return result;
  }

  win() {
    this.socket.emit('win');
  }

  lose() {
    this.socket.emit('lose');
  }

  isDefeated() {
    return this.sky.isDefeated();
  }

  disconnect() {
    if (this.game) {
      this.game.disconnect(this);
    }
  }
}

module.exports = Player;
