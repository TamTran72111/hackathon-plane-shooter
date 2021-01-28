import { createStore } from 'vuex';

import auth from './auth';
import game from './game';

export default createStore({
  modules: {
    auth,
    game,
  },
});
