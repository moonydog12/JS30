const p = document.querySelector('.showTotalTime');

// 把 nodeList 格式轉成 array
const timeNodes = [...document.querySelectorAll('[data-time]')];
// 轉成 array 後才能使用 array method
const seconds = timeNodes
  .map((node) => node.dataset.time)
  .map((timeCode) => {
    // let minutes = parseFloat(timeCode.split(':')[0]);
    // let seconds = parseFloat(timeCode.split(':')[1]);
    // split()後格式依然是 string，所以要轉成數字方便計算
    const [min, sec] = timeCode.split(':').map(parseFloat);
    // 輸出成秒
    return min * 60 + sec;
  })
  // 加總陣列中所有秒數
  .reduce((total, vidSeconds) => total + vidSeconds);
const hours = Math.floor(seconds / 3600);
let secondsLeft = seconds % 3600;
const mins = Math.floor(secondsLeft / 60);
secondsLeft %= 60;

p.innerHTML = `影片總長: ${hours}小時, ${mins}分鐘, ${secondsLeft}秒`;
