const rulesBtn = document.querySelector('#rules-btn');
const closeBtn = document.querySelector('#close-btn');
const rules = document.querySelector('.rules');

// 1)Create canvas context
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let score = 0;

const brickRowCount = 9;
const brickColumnCount = 5;

// 2)Setup ball props & draw it
const ball = {
  x: canvas.clientWidth / 2,
  y: canvas.clientHeight / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
};

const drawBall = () => {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
};

// 3)Setup paddle props & draw it
const paddle = {
  x: canvas.clientWidth / 2 - 40,
  y: canvas.clientHeight - 20,
  width: 80,
  height: 10,
  speed: 8,
  dx: 0,
};

const drawPaddle = () => {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
};

// 4)Setup brick props & create bunch of them
const brickInfo = {
  width: 70,
  height: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

// The array store all the bricks info(objects) we created
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.width + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.height + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

// Draw bricks on canvas
const drawBricks = () => {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.width, brick.height);
      ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
      ctx.fill();
      ctx.closePath();
    });
  });
};

// 5)Draw score on canvas
const drawScore = () => {
  ctx.font = '20px sans-serif';
  ctx.fillText(`Score:${score}`, canvas.clientWidth - 100, 30);
};

// 6)Update canvas drawing and animation utils

// Make all bricks appear
const showAllBricks = () => {
  bricks.forEach((column) => {
    column.forEach((el) => {
      const brick = el;
      brick.visible = true;
    });
  });
};

// Draw everything
const draw = () => {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  drawPaddle();
  drawBall();
  drawScore();
  drawBricks();
};

// 11)Increase score
const increaseScore = () => {
  score += 1;

  if (score % (brickColumnCount * brickRowCount) === 0) {
    showAllBricks();
  }
};

// 7)Move paddle on canvas
const movePaddle = () => {
  paddle.x += paddle.dx;

  if (paddle.x + paddle.width > canvas.clientWidth) {
    paddle.x = canvas.clientWidth - paddle.width;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }
};

// 9)Move ball on canvas
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // 10)Wall detection(Add wall boundaries)
  // Wall collision detection(right/left)
  if (ball.x + ball.size > canvas.clientWidth || ball.x - ball.size < 0) {
    // Reverse the ball's direction
    ball.dx *= -1;
  }

  // Wall collision detection(top/bottom)
  if (ball.y + ball.size > canvas.clientHeight || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  // Paddle collision
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.width &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }

  // Brick collision
  bricks.forEach((column) => {
    column.forEach((brick) => {
      const curBrick = brick;
      if (!curBrick.visible) return;

      // Check if the ball hit any side of the brick
      if (
        ball.x - ball.size > brick.x && // left brick side check
        ball.x + ball.size < brick.x + brick.width && // right brick side check
        ball.y + ball.size > brick.y && // top brick side check
        ball.y - ball.size < brick.y + brick.height // bottom brick side check
      ) {
        ball.dy *= -1;
        curBrick.visible = false;
        increaseScore();
      }
    });
  });

  // Hit bottom wall(Lose) - reset the game(redraw bricks & reset scores)
  if (ball.y + ball.size > canvas.clientHeight) {
    showAllBricks();
    score = 0;
  }
}

const update = () => {
  movePaddle();
  moveBall();
  // Draw everything
  draw();

  requestAnimationFrame(update);
};

update();

// 8)Keyboard event handlers to move paddle
const keyDown = (e) => {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.dx = paddle.speed;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed;
  }
};

const keyUp = (e) => {
  if (e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = 0;
  }
};

// Keyboard event handlers
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// Rules and close event handlers
rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));
