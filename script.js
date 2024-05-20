const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;
let gameInterval, lengthInterval;
let startTime,
  elapsedTime = 0;

const grid = 20;
let snake = [
  { x: 160, y: 160 },
  { x: 140, y: 160 },
  { x: 120, y: 160 },
];
let dx = grid;
let dy = 0;
let showGrid = true;

function drawGrid() {
  if (!showGrid) return;

  const gridSize = 20;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
  ctx.beginPath();

  for (let i = 0; i <= canvas.width; i += gridSize) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
  }

  for (let j = 0; j <= canvas.height; j += gridSize) {
    ctx.moveTo(0, j);
    ctx.lineTo(canvas.width, j);
  }

  ctx.stroke();
}

window.onload = function () {
  resizeCanvas();
  startGame();
  document.getElementById("toggleGrid").addEventListener("click", function () {
    showGrid = !showGrid;
    drawGrid(); // 切換網格顯示後重新繪製網格
  });
};

function gameOver() {
  clearInterval(gameInterval);
  clearInterval(lengthInterval);
  elapsedTime = Date.now() - startTime;
  alert(`Game Over!蛇碰到自己 Time: ${Math.floor(elapsedTime / 1000)} s`);
  gameInterval = null;
  lengthInterval = null;
}

function updateTimer() {
  elapsedTime = Date.now() - startTime;
  document.getElementById("timer").innerText = `Time: ${Math.floor(
    elapsedTime / 1000
  )} s`;
}

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

// recap everything need to reload

function startGame() {
  startTime = Date.now();
  snake = [
    { x: 160, y: 160 },
    { x: 140, y: 160 },
    { x: 120, y: 160 },
  ];
  dx = grid;
  dy = 0;
  if (gameInterval !== null) clearInterval(gameInterval);
  if (lengthInterval !== null) clearInterval(lengthInterval);
  gameInterval = setInterval(gameLoop, 200);
  lengthInterval = setInterval(increaseSnakeLength, 5000);
}

function drawSnakePart(snakePart) {
  ctx.fillStyle = "green";
  ctx.fillRect(snakePart.x, snakePart.y, grid - 2, grid - 2);
}

function drawSnake() {
  snake.forEach(drawSnakePart);
}

function moveSnake() {
  let newHead = {
    x: (snake[0].x + dx + canvas.width) % canvas.width,
    y: (snake[0].y + dy + canvas.height) % canvas.height,
  };

  if (
    snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
  ) {
    gameOver();
    return;
  }

  snake.unshift(newHead);
  snake.pop();
}

function increaseSnakeLength() {
  const tail = snake[snake.length - 1];
  const newTail = { x: tail.x, y: tail.y };
  snake.push(newTail);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  drawSnake();
  moveSnake();
  updateTimer();
}

document.addEventListener("keydown", function (event) {
  if (gameInterval === null) return;
  if (event.key === "ArrowUp" && dy !== 0) return;
  if (event.key === "ArrowDown" && dy !== 0) return;
  if (event.key === "ArrowLeft" && dx !== 0) return;
  if (event.key === "ArrowRight" && dx !== 0) return;

  switch (event.key) {
    case "ArrowUp":
      dx = 0;
      dy = -grid;
      break;
    case "ArrowDown":
      dx = 0;
      dy = grid;
      break;
    case "ArrowLeft":
      dx = -grid;
      dy = 0;
      break;
    case "ArrowRight":
      dx = grid;
      dy = 0;
      break;
  }
});

document.getElementById("up").addEventListener("click", function () {
  if (dy === 0) {
    dx = 0;
    dy = -grid;
  }
});

document.getElementById("down").addEventListener("click", function () {
  if (dy === 0) {
    dx = 0;
    dy = grid;
  }
});

document.getElementById("left").addEventListener("click", function () {
  if (dx === 0) {
    dx = -grid;
    dy = 0;
  }
});

document.getElementById("right").addEventListener("click", function () {
  if (dx === 0) {
    dx = grid;
    dy = 0;
  }
});
