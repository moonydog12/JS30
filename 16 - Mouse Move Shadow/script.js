const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');

function shadow(event) {
  // ES6 物件解構賦值
  // const { offsetWidth: width, offsetHeight: height } = hero;
  const width = hero.offsetWidth;
  const height = hero.offsetHeight;
  const walk = 25;
  /* 尋找目前滑鼠位置 */
  let x = event.offsetX;
  let y = event.offsetY;
  /* this 指向 hero；但因為hero有子元素，event target會因為滑鼠位置改變而指向子元素 
     用判斷式檢查目前 event target 是不是 hero，若不是，則加上滑鼠在瀏覽器上移動 x、y 軸距離
  */
  if (this !== event.target) {
    x += event.target.offsetLeft;
    y += event.target.offsetTop;
  }

  const xWalk = Math.round((x / width) * walk - walk / 2);
  const yWalk = Math.round((y / height) * walk - walk / 2);
  text.style.textShadow = `${xWalk}px ${yWalk}px 0 rgba(0,0,255,0.7)`;
}

hero.addEventListener('mousemove', shadow);
