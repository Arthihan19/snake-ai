import { canvas, BOARD_SIZE, ctx, IMMORTAL, PLAY_AI } from './settings.js';
import { setAttributes } from './HTMLElement.utils.js';
import { dom, food, input, score, snake } from './app.js';

class Game {
    constructor() {
        this.gameOver = false;
        this.requestLoopId = null;
        this.playAi = PLAY_AI;
        this.immortal = IMMORTAL;
        this.lastRenderTime = 0;
        this.pause = false;
    }

    init() {
        input.addListener();
        dom.init();
        this.drawBoard();
        this.loop();
    }

    loop() {
        this.requestLoopId = window.requestAnimationFrame((t) => this.main(t));
    }

    main(currentTime) {
        const isMaxSpeed = snake.getSpeed() >= snake.maxSpeed;
        this.loop();

        if (!isMaxSpeed) {
            const secondsSinceLastRender = (currentTime - this.lastRenderTime) / 1000;
            if (secondsSinceLastRender < 1 / snake.getSpeed()) return;
            this.lastRenderTime = currentTime;
        }

        if (this.pause) return;
        this.update();
        this.draw();
        this.checkGameOver();
    }

    update() {
        if (this.playAi) this.autoPlayAi();
        snake.update();
        food.update();
    }

    draw() {
        snake.draw();
        food.draw();
    }

    autoPlayAi() {
        const aiKey = snake.getNextBestPosition();
        input.setDirectionByKey(aiKey);
    }

    playAgain() {
        this.gameOver = false;
        snake.reset();
        food.reset();
        score.reset();
    }

    stop() {
        if (this.requestLoopId === null) return;
        window.cancelAnimationFrame(this.requestLoopId);
    }

    checkGameOver() {
        this.gameOver = snake.isDead();
        if (this.gameOver) {
            score.saveBestScore();
            input.resetDirection();
            this.playAgain();
        }
    }

    drawBoard() {
        this.setBoardSettings();
        ctx.fillRect(0, 0, BOARD_SIZE, BOARD_SIZE);
    }

    setBoardSettings() {
        setAttributes(canvas, {
            width: BOARD_SIZE,
            height: BOARD_SIZE,
        });
    }

    setPlayAi(playAi) {
        this.playAi = playAi;
    }

    setImmortal(immortal) {
        this.immortal = immortal;
    }
}

export default Game;
