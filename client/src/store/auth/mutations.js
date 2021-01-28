export default {
  login(state, { username, token }) {
    state.username = username;
    state.token = token;
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
  },
  logout(state) {
    state.username = null;
    state.token = null;
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  },
  tryLogin(state) {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    if (username && token) {
      state.username = username;
      state.token = token;
    }
  },
};
