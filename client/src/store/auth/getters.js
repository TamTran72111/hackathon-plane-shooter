export default {
  token(state) {
    return state.token;
  },
  username(state) {
    return state.username;
  },
  isLoggedIn(state) {
    return state.token !== null;
  },
};
