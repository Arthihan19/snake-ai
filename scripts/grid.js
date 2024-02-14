import { BOARD_SIZE, BOX, CROSS_WALLS, ctx, END_BOARD, START_BOARD } from './settings.js';

class Grid {
    constructor() {
        this.crossWalls = CROSS_WALLS;
    }

    setCrossWalls(crossWalls) {
        this.crossWalls = crossWalls;
    }

    drawRect(x, y, color, w = BOX, h = BOX) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
    }

    clearRect(x, y, w = BOX, h = BOX) {
        ctx.clearRect(x, y, w, h);
    }

    getRandomPosition() {
        return {
            x: Math.floor(Math.random() * BOARD_SIZE / BOX) * BOX,
            y: Math.floor(Math.random() * BOARD_SIZE / BOX) * BOX,
        };
    }

    isOutside(pos) {
        return (
            this.isOutsideLeft(pos) ||
            this.isOutsideRight(pos) ||
            this.isOutsideUp(pos) ||
            this.isOutsideDown(pos)
        );
    }

    isOutsideLeft(pos) {
        return pos.x < START_BOARD;
    }

    isOutsideRight(pos) {
        return pos.x > END_BOARD;
    }

    isOutsideUp(pos) {
        return pos.y < START_BOARD;
    }

    isOutsideDown(pos) {
        return pos.y > END_BOARD;
    }
}

export default Grid;
