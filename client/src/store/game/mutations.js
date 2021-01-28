import {
  CHOOSING_PLANE_POSITIONS,
  CHOOSING_SHOOTING_POSITION,
  ENEMY_HEADSHOT_MESSAGE,
  ENEMY_HIT_MESSAGE,
  ENEMY_MISS_MESSAGE,
  GAME_OVER,
  HEADSHOT,
  HEADSHOT_COLOR,
  HIT,
  MISS_COLOR,
  PLANE_OFFSETS,
  SKY_SIZE,
  WAITING,
  WAIT_FOR_TURN,
  YOUR_HEADSHOT_MESSAGE,
  YOUR_HIT_COLOR,
  YOUR_HIT_MESSAGE,
  YOUR_MISS_MESSAGE,
} from '../../constants';
import router from '../../router';

const createSky = () => {
  const sky = [];
  for (let i = 0; i < SKY_SIZE; i++) {
    const row = new Array(SKY_SIZE).fill('', 0, SKY_SIZE);
    sky.push(row);
  }
  return sky;
};

export default {
  addSocket(state, socket) {
    state.socket = socket;
  },
  disconnect(state) {
    state.socket = null;
  },
  fetchGames(state, games) {
    state.games = games;
  },
  joinGame(state, game) {
    state.game = game;
    router.push(`/game/${game.id}`);
  },
  leaveGame(state) {
    state.game = null;
    state.status = WAITING;
    router.push('/');
  },
  removeGuest(state) {
    if (state.game) {
      state.game.guest = null;
      state.status = WAITING;
    }
  },
  choosePlanePositions(state) {
    state.status = CHOOSING_PLANE_POSITIONS;
    state.sky = createSky();
    state.enemySky = createSky();
    state.planes = [];
    state.planeDirection = 0;
    state.lastShoot = null;
    state.lastShot = null;
  },
  placePlane(state, plane) {
    state.planes.push(plane);
  },
  invalidPlanePosition() {
    // ignore this for now
  },
  chooseShootingPosition(state) {
    state.status = CHOOSING_SHOOTING_POSITION;
  },
  waitForTurn(state) {
    state.status = WAIT_FOR_TURN;
  },
  shootResult(state, { row, col, result }) {
    if (result === HIT) {
      state.message = YOUR_HIT_MESSAGE;
      state.messageColor = YOUR_HIT_COLOR;
    } else if (result === HEADSHOT) {
      state.message = YOUR_HEADSHOT_MESSAGE;
      state.messageColor = HEADSHOT_COLOR;
    } else {
      state.message = YOUR_MISS_MESSAGE;
      state.messageColor = MISS_COLOR;
    }
    state.enemySky[row][col] = result;
    state.lastShoot = { row, col };
  },
  invalidShootingPosition() {
    // ignore this for now
  },
  beShotResult(state, { row, col, result }) {
    if (result === HIT) {
      state.message = ENEMY_HIT_MESSAGE;
      state.messageColor = YOUR_HIT_COLOR;
    } else if (result === HEADSHOT) {
      state.message = ENEMY_HEADSHOT_MESSAGE;
      state.messageColor = HEADSHOT_COLOR;
    } else {
      state.message = ENEMY_MISS_MESSAGE;
      state.messageColor = MISS_COLOR;
    }
    state.sky[row][col] = result;
    state.lastShot = { row, col };
  },
  win(state) {
    state.win = true;
    state.status = GAME_OVER;
  },
  lose(state) {
    state.win = false;
    state.status = GAME_OVER;
  },
  finish(state) {
    state.status = WAITING;
  },
  rotateLeft(state) {
    state.planeDirection += 3;
    state.planeDirection %= 4;
  },
  rotateRight(state) {
    state.planeDirection += 1;
    state.planeDirection %= 4;
  },
  pickHead(state, { row, col }) {
    const isCellAvailable = (row, col) => {
      return (
        row >= 0 &&
        row < SKY_SIZE &&
        col >= 0 &&
        col < SKY_SIZE &&
        state.sky[row][col] === ''
      );
    };

    const getOffset = (offset) => {
      let rowOffset, colOffset;
      if (state.planeDirectionIndex === 0) {
        rowOffset = offset[0];
        colOffset = offset[1];
      } else if (state.planeDirectionIndex === 2) {
        rowOffset = -offset[0];
        colOffset = offset[1];
      } else if (state.planeDirectionIndex === 1) {
        rowOffset = offset[1];
        colOffset = -offset[0];
      } else {
        rowOffset = offset[1];
        colOffset = offset[0];
      }
      return { rowOffset, colOffset };
    };

    if (isCellAvailable(row, col)) {
      const planePositions = PLANE_OFFSETS.map((offset) => {
        const { rowOffset, colOffset } = getOffset(offset);
        return { row: row + rowOffset, col: col + colOffset };
      });
      const isValidPlane = planePositions.every(({ row, col }) => {
        return isCellAvailable(row, col);
      });
      if (isValidPlane) {
        state.sky[row][col] = 'head';
        planePositions.forEach(({ row, col }) => {
          state.sky[row][col] = 'plane';
        });
        state.planes.push({ row, col, direction: state.planeDirectionIndex });
        return;
      }
    }
  },
};
