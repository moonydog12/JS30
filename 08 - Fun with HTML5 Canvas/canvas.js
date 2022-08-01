// selector
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

/* 設定canvas屬性 */
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = 'blue';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 50;

// variables
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  // 每次按下滑鼠都重設筆畫起點
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);

canvas.addEventListener('mouseup', () => (isDrawing = false));

canvas.addEventListener('mouseout', () => (isDrawing = false));

function draw(e) {
  // 監控滑鼠行為
  if (!isDrawing) {
    // 如果滑鼠行為不是 mousedown，終止 draw fn
    return;
  }
  ctx.strokeStyle = `hsl(${hue},100%,50%)`;
  ctx.beginPath();
  // 筆畫起點
  ctx.moveTo(lastX, lastY);
  // 筆畫前往
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  // 每次 draw fn 結束後都更新筆畫起點
  lastX = e.offsetX;
  lastY = e.offsetY;
  // 每次 draw fn 結束後增加 hue色階
  hue++;
  while (hue > 360) {
    hue = 0;
  }
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
  direction ? ctx.lineWidth++ : ctx.lineWidth--;
}
