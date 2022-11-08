const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const deleteButton = document.querySelector('#deleteAll');
const items = JSON.parse(localStorage.getItem('items')) || [];

const populateList = (plates) => {
  if (!plates || plates.length < 1) {
    itemsList.innerHTML = '<li class="loading-list">Loading Tapas...</li>';
  } else {
    const platesList = plates
      .map(
        (plate, i) => `
        <li>
          <input type="checkbox" data-index="${i}" id="item${i}" ${plate.done ? 'checked' : null} />
          <label for="item${i}">${plate.text}</label>
        </li>`,
      )
      .join('');
    itemsList.innerHTML = platesList;
  }
};

const addItem = (e) => {
  e.preventDefault();
  const form = e.target;
  const text = form.querySelector('input').value;
  const item = {
    text,
    done: false,
  };
  items.push(item);
  populateList(items);

  // LocalStorage only store string,so we use stringify to convert it beforehand
  localStorage.setItem('items', JSON.stringify(items));
  form.reset();
};

const deleteAllItems = () => {
  for (let i = items.length; i > 0; i--) {
    items.pop(items[i]);
  }
  localStorage.removeItem('items');
  populateList(items);
};

const toggleDone = (e) => {
  if (!e.target.matches('input')) return;
  const el = e.target;
  const { index } = el.dataset;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items);
};

addItems.addEventListener('submit', addItem);
deleteButton.addEventListener('click', deleteAllItems);
itemsList.addEventListener('click', toggleDone);
populateList(items);
