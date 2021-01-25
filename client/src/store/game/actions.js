export default {
  createSky({ commit }) {
    commit('createSky');
  },
  rotateLeft({ commit }) {
    commit('rotateLeft');
  },
  rotateRight({ commit }) {
    commit('rotateRight');
  },
  clickCell({ commit, state }, payload) {
    if (state.mode === 'PICKING') {
      commit('pickHead', payload);
    } else {
      commit('shoot', payload);
    }
  },
};
