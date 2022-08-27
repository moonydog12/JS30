'use strict';
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
  // 關閉表單 submit 會重新導向的預設行為
  e.preventDefault();
  let text = this.querySelector('input').value; // this 指向觸發e的元素，在這裡會指向 form
  let item = {
    //es6簡寫
    text, // text: text,
    done: false,
  };

  items.push(item);
  populateList(items, itemsList);
  // 把資料存入 localStorage
  /* localStorage 只能存 string，所以會把物件轉成字串，
    所以先用JSON.stringify提前轉成字串 */
  localStorage.setItem('items', JSON.stringify(items));
  this.reset();
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
      <li>
      <input type="checkbox" data-index="${i}" id="item${i}" ${
        plate.done ? 'checked' : null
      } />
      <label for="item${i}">${plate.text}</label>
    </li>
      `;
    })
    .join('');
}

function toggleDone(e) {
  if (!e.target.matches('input')) return; // 跳過非 input 的元素
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
populateList(items, itemsList);
