export default {
  cell(state) {
    return (row, col) => state.sky[row][col];
  },
};
