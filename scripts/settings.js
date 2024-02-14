// Settings
export const BOX = 10;
export const canvas = document.getElementById('canvas');
export const ctx = canvas?.getContext('2d') || null;

// Board
export const BOARD_SIZE = 700;
export const START_BOARD = 0;
export const END_BOARD = BOARD_SIZE - BOX;
export const CROSS_WALLS = false;

// Snake
export const SNAKE_COLOR = '#8300ff';
export const INITIAL_SNAKE_SPEED = 100;
export const MAX_SNAKE_SPEED = 500;
export const INITIAL_SNAKE_SPEED_INCREMENT = 0.25;

// Game
export const IMMORTAL = false;
export const PLAY_AI = true;

// Food
export const FOOD_COLOR = '#f60505';
export const INITIAL_EXPANSION_RATE = 1;
export const INITIAL_SCORE_INCREMENT = 1;
