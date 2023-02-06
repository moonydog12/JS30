# Breakout! Game

![image](../assets/image/Breakout.jpg)

Game where you control a paddle with the arrow keys to bounce a ball up to break bricks. This app uses the HTML5 canvas element and API

## Project Specifications

- Draw elements on canvas
- Use canvas paths to draw shapes
- Add animation with requestAnimationFrame(cb)
- Move paddle on arrow key press
- Add collision detection
- Keep score
- Add rules button with slider

## Note

### Draw elements on canvas

Before drawing elements on our page, we need to initialize the canvas api to create one `canvas`

```js
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
```

Create an util function to draw every piece of the game

```js
// Draw everything
const draw = function () {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  // Draw pieces
  drawPaddle();
  drawBall();
  drawScore();
  drawBricks();
};
```

### Use canvas paths to draw shapes

Use the predefined object as property to draw the widget separately(ball/paddle/bricks)

```js
// Setup the ball properties
const ball = {
  x: canvas.clientWidth / 2,
  y: canvas.clientHeight / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
};

const drawBall = function () {
  // Draw the element using the predefined object setting
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
};
```

### Add animation with requestAnimationFrame(cb)

The `window.requestAnimationFrame()` method tells the browser to perform an animation

and requests that the browser calls a specified function to update an animation before the next repaint.

The method takes a callback as an argument to be invoked before the repaint.

```js
const update = function () {
  movePaddle();
  moveBall();
  draw();

  requestAnimationFrame(update);
};
```

### Move paddle on arrow key press

```js
// Keyboard event handlers to move paddle
const keyDown = function (e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.dx = paddle.speed;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed;
  }
};

const keyUp = function (e) {
  if (e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = 0;
  }
};

// Keyboard event handlers
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
```

### Add collision detection

The most complex logic in the project, we have to calculate if the ball hit any element, and decide how the direction of ball would changed and how the element react when hit.

```js
const moveBall = function () {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Wall collision detection(right/left)
  if (ball.x + ball.size > canvas.clientWidth || ball.x - ball.size < 0) {
    // Reverse the ball's direction
    ball.dx *= -1;
  }

  // Wall collision detection(top/bottom)
  if (ball.y + ball.size > canvas.clientHeight || ball.y - ball.size < 0) {
    // Reverse the ball's direction
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
};
```

## Summary

**🗝Key points**

- canvas api
- Window.requestAnimationFrame()

**💡Reference:**

> [MDN - Window.requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
>
> [MDN - Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
