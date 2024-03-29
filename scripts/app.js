import Dom from './dom.js';
import Food from './food.js';
import Game from './game.js';
import Grid from './grid.js';
import Input from './input.js';
import Score from './score.js';
import Snake from './snake.js';

export const grid = new Grid();
export const game = new Game();
export const snake = new Snake();
export const food = new Food();
export const input = new Input();
export const score = new Score();
export let dom = new Dom();

export function App() {
    this.run = () => {
        game.init();
    }
}
