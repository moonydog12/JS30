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

// Store the list items & current dragStar item's index
const listItems = [];
let dragStarIndex;

// Swap list items that are drag and drop
const swapItems = (fromIndex, toIndex) => {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].append(itemTwo);
  listItems[toIndex].append(itemOne);
};

// Utilities which would be triggered when dragging list item
const dragStart = (e) => {
  dragStarIndex = +e.target.closest('li').getAttribute('data-index');
};

const dragEnter = (e) => {
  e.target.closest('.list-item').classList.add('over');
};

const dragLeave = (e) => {
  e.target.closest('.list-item').classList.remove('over');
};

const dragOver = (e) => {
  e.preventDefault();
};

const dragDrop = (e) => {
  const dragEndIndex = parseInt(e.target.closest('.list-item').getAttribute('data-index'), 10);
  const currentItem = document.querySelectorAll('.list-item')[dragEndIndex];
  swapItems(dragStarIndex, dragEndIndex);
  currentItem.classList.remove('over');
};

// Add drag event listeners to elements
const addDragEventsHandler = () => {
  const draggableEls = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.list-item');
  draggableEls.forEach((el) => el.addEventListener('dragstart', dragStart));
  dragListItems.forEach((el) => {
    el.addEventListener('dragover', dragOver);
    el.addEventListener('drop', dragDrop);
    el.addEventListener('dragenter', dragEnter);
    el.addEventListener('dragleave', dragLeave);
  });
};

// Insert list item into DOM
const createList = () => {
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

  addDragEventsHandler();
};

createList();

// Check the order of list items
checkButton.addEventListener('click', () => {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();

    if (personName !== richestPeople[index]) {
      listItem.classList.add('wrong');
      return;
    }

    listItem.classList.remove('wrong');
    listItem.classList.add('right');
  });
});
