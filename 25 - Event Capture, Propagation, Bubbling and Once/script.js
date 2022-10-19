// 冒泡 (內向外)
/*
const blocks = document.querySelectorAll('div');

blocks.forEach((block) =>
  block.addEventListener('click', logText, { capture: false })
);

function logText(e) {
  console.log(this.classList.value); // 輸出 three two one
}
*/

// 捕獲 (外向內)
/*
const blocks = document.querySelectorAll('div');

blocks.forEach(
  (block) => block.addEventListener('click', logText, { capture: true }) // 輸出 one two three
);

function logText(e) {
  console.log(this.classList.value);
}
*/

const blocks = document.querySelectorAll('div');
const button = document.querySelector('button');

const logText = function logText(e) {
  e.stopPropagation(); // 停止冒泡 (stop bubbling)
  if (this.classList.contains('clickOnce')) {
    this.setAttribute('disabled', true);
  }
};

// Event Listeners
blocks.forEach((block) => block.addEventListener('click', logText, { capture: false }));
button.addEventListener('click', logText, { once: true });
