'use strict';
const itemsBlock = document.querySelector('.items');
const items = document.querySelectorAll('.item');
let isDown = false; //判斷是否按住滑鼠
let startX;
let scrollLeft;

// 動態生成html元素
for (let i = 1; i <= 25; i++) {
  let div = document.createElement('div');
  div.setAttribute('class', `item item${i}`);
  div.textContent = i;
  itemsBlock.append(div);
}

itemsBlock.addEventListener('mousedown', (e) => {
  isDown = true;
  itemsBlock.classList.add('active');
  startX = e.pageX - itemsBlock.offsetLeft;
  scrollLeft = itemsBlock.scrollLeft;
});

itemsBlock.addEventListener('mouseleave', () => {
  isDown = false;
  itemsBlock.classList.remove('active');
});

itemsBlock.addEventListener('mouseup', () => {
  isDown = false;
  itemsBlock.classList.remove('active');
});

itemsBlock.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  let x = e.pageX - itemsBlock.offsetLeft;
  let walk = (x - startX) * 2;
  itemsBlock.scrollLeft = scrollLeft - walk;
});
