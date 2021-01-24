export default {
  createSky({ commit }) {
    commit('createSky');
  },
  shoot({ commit }, payload) {
    commit('shoot', payload);
  },
};
