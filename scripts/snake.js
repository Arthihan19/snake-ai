import { food, game, grid, input } from './app.js';
import { ALL_KEYS, DOWN_KEY, LEFT_KEY, RIGHT_KEY, UP_KEY } from './input.js';
import { BOX, BOARD_SIZE, INITIAL_EXPANSION_RATE, INITIAL_SNAKE_SPEED_INCREMENT, INITIAL_SNAKE_SPEED, MAX_SNAKE_SPEED, END_BOARD, START_BOARD, SNAKE_COLOR } from './settings.js';


class Snake {
    constructor() {
        this.INITIAL_SNAKE_POSITION = {
            x: Math.ceil(BOARD_SIZE / 2),
            y: Math.ceil(BOARD_SIZE / 2)
        };
        this.snakeColor = SNAKE_COLOR;
        this.snakeBody = [{ ...this.INITIAL_SNAKE_POSITION }];
        this.newSegments = 0;
        this.speed = INITIAL_SNAKE_SPEED;
        this.maxSpeed = MAX_SNAKE_SPEED;
        this.prevPositions = [];
        this.prevKey = null;
        this.prevPosition = null;
        this.nextPosition = null;
        this.currentPosition = this.snakeBody[0];
        this.slow = false;
    }

    update() {
        const { x, y } = input.getDirection();
        if (x === 0 && y === 0) return;
        this.addSegments();
        this.move({ x, y });
    }
    getNextBestPosition(badKeys = [], blocked = false) {
        const { x: snakeX, y: snakeY } = this.currentPosition;
        const { x: foodX, y: foodY } = food.getFood();
        let bestKey = null;

        const distances = {
            [UP_KEY]: snakeY - foodY,
            [DOWN_KEY]: foodY - snakeY,
            [LEFT_KEY]: snakeX - foodX,
            [RIGHT_KEY]: foodX - snakeX
        };

        const validKeys = ALL_KEYS.filter(key => {
            const newPos = this.calculateNextPosition(key);
            return !badKeys.includes(key) && !this.isDead(newPos) && !this.isIntersection(newPos);
        });

        if (validKeys.length === 0) return null;

        bestKey = validKeys.reduce((best, key) => {
            return (best === null || distances[key] > distances[best]) ? key : best;
        }, null);

        return bestKey;
    }

    calculateNextPosition(key) {
        const { x, y } = this.currentPosition;
        switch (key) {
            case UP_KEY:
                return { x, y: y - BOX };
            case DOWN_KEY:
                return { x, y: y + BOX };
            case LEFT_KEY:
                return { x: x - BOX, y };
            case RIGHT_KEY:
                return { x: x + BOX, y };
            default:
                return { x, y };
        }
    }

    move ({ x, y }) {
        const nextPos = {
            x: this.snakeBody[0].x + x * BOX,
            y: this.snakeBody[0].y + y * BOX
        };

        if (grid.crossWalls && grid.isOutsideRight(nextPos)) { nextPos.x = START_BOARD }
        if (grid.crossWalls && grid.isOutsideLeft(nextPos)) { nextPos.x = END_BOARD; }
        if (grid.crossWalls && grid.isOutsideUp(nextPos)) { nextPos.y = END_BOARD; }
        if (grid.crossWalls && grid.isOutsideDown(nextPos)) { nextPos.y = START_BOARD; }

        this.prevPosition = this.currentPosition;
        this.prevPositions.push(this.prevPosition);
        this.currentPosition = nextPos;
        this.snakeBody.pop();
        this.snakeBody.unshift(nextPos);

    }

    draw () {
        this.clear();
        for (let i = 0; i < this.snakeBody.length; i++) {
            const segment = this.snakeBody[i];
            grid.drawRect(segment.x, segment.y, this.snakeColor);
        }
    }

    reset () {
        this.resetPosition();
    }

    onSnake (position, { ignoreHead = false } = {}) {
        return this.snakeBody.some((segment, index) => {
            if (ignoreHead && index === 0) { return false; }
            return this.equalPositions(segment, position);
        });
    }

    expand (value = INITIAL_EXPANSION_RATE) {
        this.newSegments += value;
    }

    isDead (position = this.getHead()) {
        if (game.immortal) { return false; }
        return (
            (!grid.crossWalls && grid.isOutside(position)) ||
            this.isIntersection(position)
        );
    }

    isIntersection (position = this.getHead()) {
        return this.onSnake(position, { ignoreHead: true });
    }

    resetPosition () {
        this.snakeBody = [{ ...this.INITIAL_SNAKE_POSITION }];
    }

    getHead () {
        return this.snakeBody[0];
    }

    clear () {
        grid.clearRect(0, 0, BOARD_SIZE, BOARD_SIZE);
    }

    addSpeed (value = INITIAL_SNAKE_SPEED_INCREMENT) {
        if (this.speed >= this.maxSpeed) { return; }
        this.speed += value;
    }

    resetSpeed () {
        this.speed = INITIAL_SNAKE_SPEED;
    }

    setSpeed (speed) {
        this.speed = speed;
    }

    getSpeed () {
        return this.slow ? 0.5 : this.speed;
    }

    equalPositions (a, b) {
        return a.x === b.x && a.y === b.y;
    }

    addSegments () {
        for (let i = 0; i < this.newSegments; i++) {
            this.snakeBody.push({ ...this.snakeBody[this.snakeBody.length - 1] });
        }
        this.newSegments = 0;
    }

}

export default Snake;
