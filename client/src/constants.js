export const SKY_SIZE = 10;
export const PLANE_OFFSETS = [
  [1, -1],
  [1, 0],
  [1, 1],
  [2, 0],
  [3, -1],
  [3, 0],
  [3, 1],
];

export const BACKEND_SERVER = 'https://plane-shooter.herokuapp.com/';
export const WAKEUP_ENDPOINT = `${BACKEND_SERVER}wakeup`;
export const LOGIN_ENDPOINT = `${BACKEND_SERVER}login`;
export const SIGNUP_ENDPOINT = `${BACKEND_SERVER}signup`;

export const PLANE_TRANSLATES = [
  { translateX: 0, translateY: -39 },
  { translateX: -36, translateY: -4 },
  { translateX: -0.5, translateY: 33 },
  { translateX: 35.5, translateY: -3 },
];

export const WAITING = 0;
export const CHOOSING_PLANE_POSITIONS = 1;
export const CHOOSING_SHOOTING_POSITION = 2;
export const WAIT_FOR_TURN = 3;
export const GAME_OVER = 4;

export const HIT = 'hit';
export const MISS = 'miss';
export const HEADSHOT = 'headshot';

export const ENEMY_HIT_MESSAGE = 'Your plane got shot';
export const YOUR_HIT_MESSAGE = 'You has succesffully shot the enemy plane';
export const ENEMY_HIT_COLOR = 'has-text-warning';
export const YOUR_HIT_COLOR = 'has-text-success';

export const ENEMY_MISS_MESSAGE = 'The enemy was failed to shoot your planes';
export const YOUR_MISS_MESSAGE = "You're failed to shoot the enemy planes";
export const MISS_COLOR = 'has-text-info';

export const ENEMY_HEADSHOT_MESSAGE =
  'The enemy has destroyed one of your planes';
export const YOUR_HEADSHOT_MESSAGE =
  'You have succesffully destroyed one of your enemy planes';
export const HEADSHOT_COLOR = 'has-text-danger';
