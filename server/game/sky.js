const {
  SKY_SIZE,
  CELL_EMPTY,
  INVALID,
  CELL_MISS,
  CELL_HIT,
  CELL_PLANE,
  CELL_HEAD,
  CELL_HEADSHOT,
  PLANE_OFFSETS,
} = require('./constant');

const isValidIndex = (index) => index >= 0 && index < SKY_SIZE;
const isValidPosition = (row, col) => isValidIndex(row) && isValidIndex(col);

class Sky {
  constructor() {
    const sky = [];
    for (let i = 0; i < SKY_SIZE; i++) {
      const row = new Array(SKY_SIZE).fill(CELL_EMPTY, 0, SKY_SIZE);
      sky.push(row);
    }
    this.sky = sky;
    this.planes = [];
    this.alive = MAX_PLANES;
  }

  isCellAvailable(row, col) {
    return isValidPosition(row, col) && this.sky[row][col] === CELL_EMPTY;
  }

  shoot({ row, col }) {
    if (isValidPosition(row, col)) {
      if (this.sky[row][col] === CELL_HIT || this.sky[row][col] === CELL_MISS) {
        throw INVALID;
      } else {
        if (this.sky[row][col] === CELL_PLANE) {
          return CELL_HIT;
        } else if (this.sky[row][col] === CELL_HEAD) {
          this.alive -= 1;

          return CELL_HEADSHOT;
        }
        return CELL_MISS;
      }
    } else {
      throw INVALID;
    }
  }

  isDefeated() {
    return this.alive === 0;
  }

  placePlane({ row, col, direction }) {
    const planePositions = PLANE_OFFSETS.map((offset) => {
      let rowOffset, colOffset;
      if (direction === 0) {
        rowOffset = offset[0];
        colOffset = offset[1];
      } else if (direction === 2) {
        rowOffset = -offset[0];
        colOffset = offset[1];
      } else if (direction === 1) {
        rowOffset = offset[1];
        colOffset = -offset[0];
      } else {
        rowOffset = offset[1];
        colOffset = offset[0];
      }
      return { row: row + rowOffset, col: col + colOffset };
    });
    const canPutPlane = planePositions.every(({ row, col }) => {
      this.isCellAvailable(row, col);
    });
    if (canPutPlane) {
      planePositions.forEach(({ row, col }) => {
        this.sky[row][col] = CELL_PLANE;
      });
      this.sky[row][col] = CELL_HEAD;
      this.planes.push({ row, col, direction });
      return true;
    } else {
      return false;
    }
  }
}

module.exports = Sky;
