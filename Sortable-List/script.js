const draggableList = document.querySelector('#draggable-list');
const checkButton = document.querySelector('#check-btn');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page',
];

// Store the list items
const listItems = [];

let dragStarIndex;

// Insert list item into DOM
const createList = () => {
  // Scrambles array order
  [...richestPeople]
    .map((person) => ({ value: person, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((obj) => obj.value)
    .forEach((person, index) => {
      const listItem = document.createElement('li');
      listItem.setAttribute('data-index', index);
      listItem.setAttribute('class', 'list-item');

      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${person}</p>
          <i class="fas fa-grip-lines"></i>
        </div>`.trim();

      listItems.push(listItem);
      draggableList.append(listItem);
    });

  addEventListeners();
};

createList();

function dragStart() {
  dragStarIndex = +this.closest('li').getAttribute('data-index');
  console.log(dragStarIndex);
}
function dragEnter() {
  this.classList.add('over');
}
function dragLeave() {
  this.classList.remove('over');
}
function dragOver(e) {
  e.preventDefault();
}
function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStarIndex, dragEndIndex);
  this.classList.remove('over');
}

// Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

// Check the order of list items
function checkOrder() {
  // Loop through the list
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();

    // Matching the order with the original array
    if (personName !== richestPeople[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.list-item');

  draggables.forEach((el) => el.addEventListener('dragstart', dragStart));
  dragListItems.forEach((el) => {
    el.addEventListener('dragover', dragOver);
    el.addEventListener('drop', dragDrop);
    el.addEventListener('dragenter', dragEnter);
    el.addEventListener('dragleave', dragLeave);
  });
}

checkButton.addEventListener('click', checkOrder);
