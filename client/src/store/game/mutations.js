import { PLANE_OFFSETS, SKY_SIZE } from '../../constants';

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
  rotateLeft(state) {
    state.planeDirectionIndex += 3;
    state.planeDirectionIndex %= 4;
  },
  rotateRight(state) {
    state.planeDirectionIndex += 1;
    state.planeDirectionIndex %= 4;
  },
  pickHead(state, { row, col }) {
    const isCellAvailable = (row, col) => {
      return (
        row >= 0 &&
        row < SKY_SIZE &&
        col >= 0 &&
        col < SKY_SIZE &&
        state.sky[row][col] === ''
      );
    };

    const getOffset = (offset) => {
      let rowOffset, colOffset;
      if (state.planeDirectionIndex === 0) {
        rowOffset = offset[0];
        colOffset = offset[1];
      } else if (state.planeDirectionIndex === 2) {
        rowOffset = -offset[0];
        colOffset = offset[1];
      } else if (state.planeDirectionIndex === 1) {
        rowOffset = offset[1];
        colOffset = -offset[0];
      } else {
        rowOffset = offset[1];
        colOffset = offset[0];
      }
      return { rowOffset, colOffset };
    };

    if (isCellAvailable(row, col)) {
      const isValidPlane = PLANE_OFFSETS.map((offset) => {
        const { rowOffset, colOffset } = getOffset(offset);
        return isCellAvailable(row + rowOffset, col + colOffset);
      });
      if (isValidPlane.every((a) => a)) {
        // TODO: setup valid picking
        console.log('head at', row, col);
        return;
      }
    }
    // TODO: handle invalid picking
    console.log('invalid head');
  },
};
