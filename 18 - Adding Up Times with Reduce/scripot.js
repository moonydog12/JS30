'use strict';
// 把 nodeList 格式轉成 array
const timeNodes = [...document.querySelectorAll('[data-time]')];
// 轉成 array 後才能使用 array method
const seconds = timeNodes
  .map((node) => node.dataset.time)
  .map((timeCode) => {
    /* 
    let minutes = +timeCode.split(':')[0];
    let seconds = +timeCode.split(':')[1];
    split()後格式依然是 string，所以要轉成數字方便計算 
    */
    let [minutes, seconds] = timeCode.split(':').map(parseFloat);
    // 輸出成秒
    return minutes * 60 + seconds;
  })
  // 加總陣列中所有秒數
  .reduce((total, vidSeconds) => total + vidSeconds);
let hours = Math.floor(seconds / 3600);
let secondsLeft = seconds % 3600;
let mins = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;
console.info(`影片總長: ${hours}小時, ${mins}分鐘, ${secondsLeft}秒`);
