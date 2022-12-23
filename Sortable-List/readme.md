## Sortable List

![Sortable list](../assets/image/Sortable-list.webp)

Display a scrambled list that can be sorted with drag and drop

## Project Specifications

- Create an ordered list (Top 10 richest people)
- Scramble list items randomly
- Allow user to drag and drop an item to a different position
- Button to check if items are in correct order
- Show green for correct order and red for wrong order

## Note

**Create an ordered list :**

Create an array to store the data, the index of each person should be ranked by their wealth. We would like to examine final result of the list matched correct order.

```javascript
const richestPeople = [
  // The index matters
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
```

**Scramble list items randomly :**

```javascript
const createList = () => {
  // 1)Create an new array, so we wont mutate the original array
  [...richestPeople]

    // 2)Map though it, and return a new array that contains random generated number
    .map((person) => ({ value: person, sort: Math.random() }))

    // 3)Sort the data with random generated data
    .sort((a, b) => a.sort - b.sort)

    // 4)Map though it again, return the array which stores only person names
    .map((obj) => obj.value)

    // 5)Create element and insert the data into it
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
```

**Allow user to drag and drop an item to a different position :**

Bind the corresponding handler functions and drag events to the elements.

Read the MDN doc of the API fore more detail.

```javascript
const dragStart = (e) => {
  dragStarIndex = +e.target.closest('li').getAttribute('data-index');
};

const dragEnter = (e) => {
  e.target.closest('.list-item').classList.add('over');
};

const dragLeave = (e) => {
  e.target.closest('.list-item').classList.remove('over');
};

// Dragover event have the default behavior that block CSS effects when we drag the item,we have to cancel it here
const dragOver = (e) => {
  e.preventDefault();
};

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
```

**Check if items are in correct order**

```javascript
checkButton.addEventListener('click', () => {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();

    // Compare current item's index with the original array,then check if the order matched.
    if (personName !== richestPeople[index]) {
      listItem.classList.add('wrong');
      return;
    }

    //  Manipulate DOM
  });
});
```

## Summary

**🗝️Key points :**

- Browser drag and drop API
- Chaining of array methods

**💡References :**

[MDN - Drag and dop](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
