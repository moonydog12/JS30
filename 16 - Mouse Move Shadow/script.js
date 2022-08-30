const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');

function shadow(e) {
  /* 
    const width = hero.offsetWidth;
    const height = hero.offsetHeight; 
  */
  const { offsetWidth: width, offsetHeight: height } = hero;

  const walk = 50;

  let { offsetX: offsetXAdjust, offsetY: offsetYAdjust } = e; // 尋找目前滑鼠位置

  //  用判斷式檢查目前 event target 是不是 hero，若不是，則加上滑鼠在瀏覽器上移動 x、y 軸距離
  if (this !== e.target) {
    offsetXAdjust += e.target.offsetLeft;
    offsetYAdjust += e.target.offsetTop;
  }

  const xWalk = Math.round((offsetXAdjust / width) * walk - walk / 2);
  const yWalk = Math.round((offsetYAdjust / height) * walk - walk / 2);
  text.style.textShadow = `${xWalk}px ${yWalk}px 5px rgba(0,0,255,0.7)`;
}

hero.addEventListener('mousemove', shadow);
