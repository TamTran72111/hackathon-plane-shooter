import axios from 'axios';
import {
  LOGIN_ENDPOINT,
  SIGNUP_ENDPOINT,
  WAKEUP_ENDPOINT,
} from '../../constants';
export default {
  tryLogin({ commit, dispatch }) {
    // Wakeup the heroku server to increase user experience
    axios.get(WAKEUP_ENDPOINT);

    commit('tryLogin');
    dispatch('setupSocket');
  },
  async login({ commit, dispatch }, { username, password }) {
    const response = await axios.post(LOGIN_ENDPOINT, {
      username,
      password,
    });
    commit('login', { username, token: response.data.token });
    dispatch('setupSocket');
  },
  async signup({ commit, dispatch }, { username, password }) {
    const response = await axios.post(SIGNUP_ENDPOINT, {
      username,
      password,
    });
    commit('login', { username, token: response.data.token });
    dispatch('setupSocket');
  },
  logout({ commit, dispatch }) {
    commit('logout');
    dispatch('disconnect');
  },
};
