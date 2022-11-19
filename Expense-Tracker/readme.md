# Expense Tracker

![image](../assets/image/expense-tracker.jpg)

Keep track of income and expenses. Add and remove items and save to local storage

## Project Specifications

- Create UI for project
- Display transaction items in DOM
- Show balance, expense and income totals
- Add new transaction and reflect in total
- Delete items from DOM
- Persist to local storage

## Note

**Display transaction items in DOM**

Whenever the user reloads the page, the app will look for transaction data in the localStorage first, if data existed, stored it in the global variable `transactions`.

```js
const localStorageTransaction = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransaction : [];

const addTransactionDOM = (transaction) => {
  // 1) Get sign

  // 2) Add class based on value

  // 3) Append the element to DOM

  // Set the custom attribute `id` for later usage
  item.setAttribute('data-id', transaction.id);
  list.append(item);
};
```

**Show balance, expense and income totals**

Use `map()` to creates a new array `amounts` with all the elements of `transactions` array we fetch from localStorage. Then, we use `filter()` to filter out the data we need for different states.

```js
const updateValues = () => {
  // Get amount value of each transaction and store in an array
  const amounts = transactions.map((transaction) => transaction.amount);

  // Calculate total balance

  // Calculate total income

  // Calculate total expense

  // Append the different totals to relevant element
};
```

**Add new transaction and reflect in total**

Each time a new transaction is added, we need to 1) add it to the transactions array, 2) populate the ul element, 3) update relevant data expense/income & balance, and elements in DOM, 4) update the data stored in the localStorage, 5) reset the form for possible input.

```js
const addTransaction = (e) => {
  // Get value from input elements
  const textInputVal = text.value.trim();
  const amountInputVal = amount.value.trim();

  // Create a new transaction
  const transaction = {
    id: generateID(),
    text: textInputVal,
    amount: +amountInputVal,
  };

  // Add it to the transactions array
  transactions.push(transaction);

  // Render it to list element
  addTransactionDOM(transaction);

  // Update relevant DOM element
  updateValues();
  updateLocalStorage();
  form.reset();
};
```

**Delete items from DOM**

In the original project, teacher bound the `onClick` method & random generated ID on the DOM element when he created new `li`. I try to detach the javaScript from HTML, therefore I define custom property `data-id` whenever new `li` list item were created.

```js
const removeTransaction = (id) => {
  const filteredId = +id;

  // Filter out the id that we want to delete from the array
  transactions = transactions.filter((transaction) => transaction.id !== filteredId);
  updateLocalStorage();
  init();
};

list.addEventListener('click', (e) => {
  // Use delegation for better performance(replace using nodeList to add listener for each delete-btn)
  if (e.target.classList.contains('delete-btn')) {
    const parentLi = e.target.closest('li');

    // Object destructuring to get the value from custom attribute
    const { id } = parentLi.dataset;
    removeTransaction(id);
  }
});
```

## Summary

I really learn a lot from this project, however, manually handle data & states of DOM elements make the code messy and hard to read. Maybe React.js can handle it better ?

**Key points**

- Custom HTML attribute
- High order array methods

**Reference:**

>[MDN - HTMLElement.dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)
>
>[Array cardio day 1](https://github.com/moonydog12/JavaScript-Armory/tree/main/Array-Cardio-Day1)
>
>[Array cardio day 2](https://github.com/moonydog12/JavaScript-Armory/tree/main/Array-Cardio-Day2)