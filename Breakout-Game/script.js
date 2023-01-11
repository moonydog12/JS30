const rulesBtn = document.querySelector('#rules-btn');
const closeBtn = document.querySelector('#close-btn');
const rules = document.querySelector('.rules');
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let score = 0;

const brickRowCount = 9;
const brickColumnCount = 5;

/**
 * todo:
 * 1.Create canvas context(X)
 * 2.Create and draw ball(X)
 * 3.Create and draw paddle(X)
 * 4.Create bricks
 * 5.Draw score
 * 6.Add update() feature - animate - requestAnimationFrame(callback)
 * 7.Move paddle
 * 8.Keyboard event handlers to move paddle
 * 9.Move ball
 * 10.Add wall boundaries
 * 11.Increase score when bricks break
 * 12.Lose - redraw bricks, reset score
 */

// Create ball props
const ball = {
  x: canvas.clientWidth / 2,
  y: canvas.clientHeight / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
};

// Draw ball on canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

// Create paddle props
const paddle = {
  x: canvas.clientWidth / 2 - 40,
  y: canvas.clientHeight - 20,
  width: 80,
  height: 10,
  speed: 8,
  dx: 0,
};

// Create brick props
const brickInfo = {
  width: 70,
  height: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

// Create bricks
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.width + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.height + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

// Draw paddle on canvas
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

// Draw bricks on canvas
function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.width, brick.height);
      ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
      ctx.fill();
      ctx.closePath();
    });
  });
}

// Draw everything
function draw() {
  drawPaddle();
  drawBall();
  drawScore();
  drawBricks();
}

draw();

// Draw score on canvas
function drawScore() {
  ctx.font = '20px Jetbrains mono';
  ctx.fillText(`Score:${score}`, canvas.clientWidth - 100, 30);
}

// Rules and close event handlers
rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));
