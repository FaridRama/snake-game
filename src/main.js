const board = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const boardSize = 20;
const initialSnakeLength = 3;
let snake = [];
let direction = { x: 1, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;
let gameInterval;

function initGame() {
    createBoard();
    resetGame();
    document.addEventListener('keydown', changeDirection);
}

function createBoard() {
    board.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;
    board.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
    for (let i = 0; i < boardSize * boardSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        board.appendChild(cell);
    }
}

function resetGame() {
    snake = [];
    direction = { x: 1, y: 0 };
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    createSnake();
    placeFood();
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(updateGame, 200);
}

function createSnake() {
    for (let i = initialSnakeLength - 1; i >= 0; i--) {
        snake.push({ x: i, y: 0 });
    }
    drawSnake();
}

function drawSnake() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.classList.remove('snake'));
    snake.forEach(segment => {
        const index = segment.y * boardSize + segment.x;
        cells[index].classList.add('snake');
    });
}

function placeFood() {
    food.x = Math.floor(Math.random() * boardSize);
    food.y = Math.floor(Math.random() * boardSize);
    drawFood();
}

function drawFood() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.classList.remove('food'));
    const index = food.y * boardSize + food.x;
    cells[index].classList.add('food');
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
        case 's':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
        case 'a':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
        case 'd':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
}

function updateGame() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        alert('Game Over');
        resetGame();
    } else {
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            placeFood();
        } else {
            snake.pop();
        }
        drawSnake();
    }
}

initGame();