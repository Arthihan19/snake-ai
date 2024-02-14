import { game, grid, score, snake } from './app.js';
import { setAttributes } from './HTMLElement.utils.js';

class Dom {
    constructor() {

    }

    init() {
        this.renderSpeedSlider();
        this.renderActiveAiCheckbox();
        this.renderCrossWallsCheckbox();
        this.renderImmortalCheckbox();
        this.updateScore();
    }

    renderCheckbox(containerId, label, checked = false, onChange = () => { }, props = {}) {
        const containerEl = document.getElementById(containerId);
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.checked = checked;
        input.onchange = onChange;
        setAttributes(input, { ...props });
        if (!props.disabled) { input.removeAttribute('disabled'); }

        const span = document.createElement('span');
        span.className = 'ml-2 text-lg text-yellow-500';
        span.innerHTML = label;

        containerEl.innerHTML = '';
        containerEl?.appendChild(input);
        containerEl.style.margin = '1.5rem';
        containerEl.style.marginTop = '0';
        containerEl?.appendChild(span);
    }

    renderImmortalCheckbox() {
        const containerId = 'immortal-container';
        const label = 'Immortal'
        const checked = game.immortal;
        const onChange = (event) => {
            const { checked } = event.target;
            game.setImmortal(checked);
            if (checked) { grid.setCrossWalls(checked) }
            this.renderCrossWallsCheckbox({ disabled: checked });
        };
        this.renderCheckbox(containerId, label, checked, onChange);
    }

    renderCrossWallsCheckbox({ disabled = false } = {}) {
        const containerId = 'cross-walls-container';
        const label = 'Cross walls'
        const checked = grid.crossWalls;
        const onChange = (event) => grid.setCrossWalls(event.target.checked);
        this.renderCheckbox(containerId, label, checked, onChange, { disabled });
    }

    renderActiveAiCheckbox() {
        const containerId = 'active-ai-container';
        const label = 'AI'
        const checked = game.playAi;
        const onChange = (event) => game.setPlayAi(event.target.checked);
        this.renderCheckbox(containerId, label, checked, onChange);
    }

    renderSpeedSlider() {
        const speedLabel = () => `Speed: ${snake.getSpeed()}`;
        function onChange(event) {
            function updateSpeedLabel() {
                const speedLabelEl = document.getElementById('speed-label');
                speedLabelEl.innerHTML = speedLabel();
            }

            const speed = event.target.value;
            snake.setSpeed(speed);
            updateSpeedLabel();
        }

        const containerEl = document.getElementById('speed-slider-container');
        const input = document.createElement('input');
        setAttributes(input, {
            id: "speed-slider",
            type: "range",
            step: "1",
            value: snake.getSpeed(),
            min: "1",
            max: snake.maxSpeed,
            'aria-label': "Speed",
        });
        input.oninput = onChange;

        const speed = document.createElement('p');
        speed.id = 'speed-label';
        speed.className = 'text-lg';
        speed.innerHTML = speedLabel();

        containerEl.innerHTML = '';
        containerEl.appendChild(input);
        containerEl.appendChild(speed);
    }

    updateScore() {
        const scoreEl = document.getElementById('score');
        const container = document.createElement('div');

        const scoreP = document.createElement('p');
        scoreP.setAttribute('style', 'font-size: 28px');
        scoreP.innerHTML = `Score: ${score.getScore()}`

        const bestScore = document.createElement('p');
        bestScore.setAttribute('style', 'font-size: 14px');
        bestScore.innerHTML = `Best: ${score.getBestScore()}`

        container.appendChild(scoreP);
        container.appendChild(bestScore);

        scoreEl.innerHTML = '';
        scoreEl.appendChild(container);
    }
}

export default Dom;