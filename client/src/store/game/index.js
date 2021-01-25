import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export default {
  state() {
    return {
      sky: [],
      planeDirectionIndex: 0,
      mode: 'PICKING',
    };
  },
  getters,
  mutations,
  actions,
};
