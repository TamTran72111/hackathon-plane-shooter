import {
  CHOOSING_PLANE_POSITIONS,
  CHOOSING_SHOOTING_POSITION,
  GAME_OVER,
  PLANE_TRANSLATES,
  WAITING,
  WAIT_FOR_TURN,
} from '../../constants';

export default {
  games(state) {
    return state.games;
  },
  isHost(state, _, rootState) {
    return state.game?.host === rootState.auth.username;
  },
  host(state) {
    return state.game?.host;
  },
  isWaiting(state) {
    return state.status === WAITING;
  },
  isWaitForTurn(state) {
    return state.status === WAIT_FOR_TURN;
  },
  isChoosingPlanePositions(state) {
    return state.status === CHOOSING_PLANE_POSITIONS;
  },
  isChoosingShootingPositions(state) {
    return state.status === CHOOSING_SHOOTING_POSITION;
  },
  isPlaying(state) {
    return (
      state.status === WAIT_FOR_TURN ||
      state.status === CHOOSING_SHOOTING_POSITION
    );
  },
  isGameOver(state) {
    return state.status === GAME_OVER;
  },
  guest(state) {
    return state.game?.guest;
  },
  isInRoom(state) {
    return state.game !== null && state.game.id !== undefined;
  },
  cell(state) {
    return (row, col, isEnemy = false) =>
      isEnemy ? state.enemySky[row][col] : state.sky[row][col];
  },
  status(state) {
    return state.status;
  },
  message(state) {
    return state.message;
  },
  messageColor(state) {
    return state.messageColor;
  },
  win(state) {
    return state.win;
  },
  isHead(state) {
    return (row, col) =>
      state.planes.find((plane) => plane.row === row && plane.col === col);
  },
  planeDirection(state) {
    return state.planeDirection;
  },
  planes(state) {
    return state.planes;
  },
  lastShoot(state) {
    return (row, col, isEnemy) => {
      if (isEnemy) {
        if (state.lastShoot !== null) {
          return state.lastShoot.row === row && state.lastShoot.col === col;
        }
      } else {
        if (state.lastShot !== null) {
          return state.lastShot.row === row && state.lastShot.col === col;
        }
      }
      return false;
    };
  },
  translate(state) {
    return (row, col) => {
      const plane = state.planes.find(
        (plane) => plane.row === row && plane.col === col
      );
      if (plane) {
        return PLANE_TRANSLATES[plane.direction];
      } else {
        return [];
      }
    };
  },
  rotation(state) {
    return (row, col) => {
      const plane = state.planes.find(
        (plane) => plane.row === row && plane.col === col
      );
      if (plane) {
        return 90 * plane.direction;
      } else {
        return 0;
      }
    };
  },
  socket(state) {
    return state.socket;
  },
};
