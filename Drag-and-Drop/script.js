const draggableList = document.querySelector('#draggable-list');
const checkBtn = document.querySelector('#check-btn');

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
};

createList();
