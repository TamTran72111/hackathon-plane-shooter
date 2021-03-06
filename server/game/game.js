const { v4: uuidv4 } = require('uuid');
const { WAITING, INVALID, PLAYING } = require('./constant');

class Game {
  constructor(host) {
    this.id = uuidv4();
    this.host = host;
    this.oponent = null;
    this.hostPlaying = true;
    this.gameStatus = WAITING;
  }

  join(player) {
    if (this.oponent || this.host.username === player.username) {
      return false;
    }
    this.oponent = player;
    player.game = this;
    const notifyPayload = {
      id: this.id,
      host: this.host.username,
      guest: player.username,
    };
    this.host.notifyJoinGame(notifyPayload);
    player.notifyJoinGame(notifyPayload);
    return true;
  }

  leave(player) {
    if (this.oponent && player.username === this.oponent.username) {
      this.oponent = null;
      this.host.notifyLeaveGame();
      player.notifyLeftGame();
    } else if (this.host.username == player.username) {
      if (this.oponent) this.oponent.leaveGame();
      return this.id;
    }
    return null;
  }

  start(player) {
    if (player.username === this.host.username && this.oponent) {
      this.host.status = PLAYING;
      this.oponent.status = PLAYING;
      this.gameStatus = PLAYING;
      this.host.choosePlanePositions();
      this.oponent.choosePlanePositions();
      return true;
    }
    return false;
  }

  kick(player) {
    if (this.host.username === player.username) {
      if (this.oponent) {
        this.oponent.leaveGame();
        return true;
      }
    }
    return false;
  }

  fight() {
    if (this.host.isReady() && this.oponent.isReady()) {
      this.hostPlaying = true;
      this.host.chooseShootingPosition();
      this.oponent.waitForTurn();
    }
  }

  shoot(player, position) {
    if (this.hostPlaying) {
      if (this.host.username === player.username) {
        return this.oponent.beShotAt(position);
      }
    } else {
      if (this.oponent.username === player.username) {
        return this.host.beShotAt(position);
      }
    }
    throw INVALID;
  }

  checkGameOver() {
    if (this.oponent.isDefeated()) {
      this.host.win();
      this.oponent.lose();
      this.gameStatus = WAITING;
      return true;
    }
    if (this.host.isDefeated()) {
      this.oponent.win();
      this.host.lose();
      this.gameStatus = WAITING;
      return true;
    }
    return false;
  }

  nextTurn() {
    if (this.checkGameOver()) {
      return;
    }
    this.hostPlaying = !this.hostPlaying;
    if (this.hostPlaying) {
      this.host.chooseShootingPosition();
      this.oponent.waitForTurn();
    } else {
      this.host.waitForTurn();
      this.oponent.chooseShootingPosition();
    }
  }

  disconnect(player) {
    if (this.gameStatus === PLAYING && this.oponent && player) {
      if (this.oponent.username === player.username) {
        this.host.win();
        this.oponent.lose();
      } else if (this.host && this.host.username === player.username) {
        this.host.lose();
        this.oponent.win();
      }
    }
    this.leave(player);
  }
}

module.exports = Game;
