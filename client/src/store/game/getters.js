export default {
  cell(state) {
    return (row, col) => state.sky[row][col];
  },
  mode(state) {
    return state.mode;
  },
};
