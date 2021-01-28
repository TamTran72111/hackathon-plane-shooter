import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import { WAITING } from '../../constants';

export default {
  state() {
    return {
      sky: [],
      enemySky: [],
      planeDirection: 0,
      status: WAITING,
      planes: [],
      socket: null,
      games: [],
      game: null,
      win: false,
      lastShoot: null,
      lastShot: null,
      message: '',
      messageColor: '',
    };
  },
  getters,
  mutations,
  actions,
};
