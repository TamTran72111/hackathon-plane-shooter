import { SKY_SIZE } from '../../constants';

export default {
  createSky(state) {
    const sky = [];
    for (let i = 0; i < SKY_SIZE; i++) {
      const row = new Array(SKY_SIZE).fill('', 0, SKY_SIZE);
      sky.push(row);
    }
    state.sky = sky;
  },
  shoot(state, { row, col }) {
    const results = ['miss', 'hit', 'headshot'];
    const resultIndex = Math.floor(Math.random() * results.length);
    state.sky[row][col] = results[resultIndex];
  },
};
