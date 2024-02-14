import { grid, score, snake } from './app.js';
import { FOOD_COLOR } from './settings.js';

class Food {
    constructor() {
        this.food = this.getRandomPosition();
        this.color = FOOD_COLOR;
    }

    getFood() {
        return this.food;
    }

    setFood(food) {
        this.food = food;
    }

    update() {
        if (!snake.onSnake(this.food)) { return; }
        score.add();
        snake.expand();
        this.setRandomPosition();
    }

    draw() {
        grid.drawRect(this.food.x, this.food.y, this.color);
    }

    reset() {
        this.setRandomPosition();
    }

    setRandomPosition() {
        this.setFood(this.getRandomPosition());
    }

    getRandomPosition() {
        let newFoodPosition = null;
        while (newFoodPosition === null || snake.onSnake(newFoodPosition)) {
            newFoodPosition = grid.getRandomPosition();
        }
        return newFoodPosition;
    }
}

export default Food;
