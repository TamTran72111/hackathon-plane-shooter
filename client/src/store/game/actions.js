import { BACKEND_SERVER } from '../../constants';

export default {
  setupSocket({ commit, rootGetters }) {
    const token = rootGetters.token;
    if (token) {
      const socket = window.io(BACKEND_SERVER, {
        query: { token },
      });
      socket.on('listGame', (games) => {
        commit('fetchGames', games);
      });

      socket.on('createdGame', (game) => {
        commit('joinGame', game);
      });

      socket.on('notifyJoinGame', (game) => {
        commit('joinGame', game);
      });

      socket.on('notifyLeaveGame', () => {
        commit('removeGuest');
      });

      socket.on('leftGame', () => {
        commit('leaveGame');
      });

      socket.on('choosePlanePositions', () => {
        commit('choosePlanePositions');
      });

      socket.on('placePlane', (payload) => {
        commit('placePlane', payload);
      });

      socket.on('invalidPlanePosition', () => {
        commit('invalidPlanePosition');
      });

      socket.on('chooseShootingPosition', () => {
        commit('chooseShootingPosition');
      });

      socket.on('waitForTurn', () => {
        console.log('waitForTurn');
        commit('waitForTurn');
      });

      socket.on('shootResult', (result) => {
        commit('shootResult', result);
      });

      socket.on('invalidShootingPosition', () => {
        commit('invalidShootingPosition');
      });

      socket.on('beShotResult', (result) => {
        commit('beShotResult', result);
      });

      socket.on('win', () => {
        commit('win');
      });

      socket.on('lose', () => {
        commit('lose');
      });

      commit('addSocket', socket);
    }
  },
  disconnect({ commit, getters }) {
    const socket = getters.socket;
    socket.disconnect();
    commit('disconnect');
  },
  createGame({ getters }) {
    const socket = getters.socket;
    if (socket) {
      socket.emit('createGame');
    }
  },
  joinGame({ getters }, game) {
    const socket = getters.socket;
    if (socket) {
      socket.emit('joinGame', game.id);
    }
  },
  leaveGame({ getters }) {
    const socket = getters.socket;
    if (socket) {
      socket.emit('leaveGame');
    }
  },
  fetchGames({ getters }) {
    const socket = getters.socket;
    if (socket) {
      socket.emit('fetchGames');
    }
  },
  startGame({ getters }) {
    const socket = getters.socket;
    if (socket) {
      socket.emit('startGame');
    }
  },
  kick({ getters }) {
    const socket = getters.socket;
    if (socket) {
      socket.emit('kick');
    }
  },
  choosePlanePosition({ getters }, payload) {
    const socket = getters.socket;
    if (socket) {
      socket.emit('choosePlanePosition', payload);
    }
  },
  shoot({ getters }, position) {
    const socket = getters.socket;
    if (socket) {
      socket.emit('shoot', position);
    }
  },
  createSky({ commit }) {
    commit('createSky');
  },
  rotateLeft({ commit }) {
    commit('rotateLeft');
  },
  rotateRight({ commit }) {
    commit('rotateRight');
  },
  clickCell({ dispatch, getters }, payload) {
    if (getters.isChoosingPlanePositions) {
      dispatch('choosePlanePosition', {
        row: payload.row,
        col: payload.col,
        direction: getters.planeDirection,
      });
    } else if (getters.isChoosingShootingPositions && payload.isEnemy) {
      dispatch('shoot', { row: payload.row, col: payload.col });
    }
  },
};
