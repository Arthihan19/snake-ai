import { dom } from './app.js';
import { INITIAL_SCORE_INCREMENT } from './settings.js';

class Score {
    constructor() {
        this.score = 0;
    }

    getScore() {
        return this.score;
    }

    setScore(score) {
        this.score = score;
        dom.updateScore();
    }

    add(value = INITIAL_SCORE_INCREMENT) {
        this.setScore(this.score + value);
    }

    reset() {
        this.setScore(0);
    }

    getBestScore() {
        return Number(localStorage.getItem('bestScore') || 0);
    }

    setBestScore(bestScore) {
        localStorage.setItem('bestScore', bestScore);
    }

    saveBestScore(currentScore = this.score) {
        if (currentScore > this.getBestScore()) {
            this.setBestScore(currentScore);
        }
    }
}

export default Score;
