'use strict';

// 監聽視窗keydown行為
window.addEventListener('keydown', playSound);

const keys = document.querySelectorAll('.key');
keys.forEach((key) =>
  // 監聽每一個按鍵 transition 動畫結束，當動畫結束，執行removeTransition
  key.addEventListener('transitionend', removeTransition)
);

function removeTransition(e) {
  if (e.propertyName !== 'transform') return; // 如果 propertyName 不是 transform 行為，略過它
  this.classList.remove('playing'); // this 指向呼叫該行為的元素
}

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (!audio) return; // 如果沒有該元素，停止執行function
  audio.currentTime = 0; //讓每次按下按鍵，音效都重新計時
  audio.play();
  key.classList.toggle('playing');
}
