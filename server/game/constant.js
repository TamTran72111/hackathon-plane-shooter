const PLANE_OFFSETS = [
  [0, 0],
  [1, -1],
  [1, 0],
  [1, 1],
  [2, 0],
  [3, -1],
  [3, 0],
  [3, 1],
];

const CELL_EMPTY = '';
const CELL_MISS = 'miss';
const CELL_HIT = 'hit';
const CELL_HEADSHOT = 'headshot';
const CELL_PLANE = 'miss'; // cell value represents a plane's part
const CELL_HEAD = 'head';
const SKY_SIZE = 10;
const MAX_PLANES = 3;
const INVALID = 'INVALID';
const DEFEATED = 'DEFEATED';

// User status
const ONLINE = 'ONLINE';
const PLACING_PLANES = 'PLACING_PLANES';
const WAITING = 'WAITING';
const PLAYING = 'PLAYING';
const READY = 'READY';

module.exports = {
  PLANE_OFFSETS,
  CELL_HEAD,
  CELL_HEADSHOT,
  CELL_HIT,
  CELL_MISS,
  CELL_PLANE,
  CELL_EMPTY,
  SKY_SIZE,
  INVALID,
  MAX_PLANES,
  DEFEATED,
  ONLINE,
  PLACING_PLANES,
  WAITING,
  PLAYING,
  READY,
};
