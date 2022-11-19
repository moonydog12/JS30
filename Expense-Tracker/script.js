const balance = document.querySelector('.balance-heading');
const monyPlus = document.querySelector('#money-plus');
const moneyMinus = document.querySelector('#money-minus');
const list = document.querySelector('.history__list');
const form = document.querySelector('#form');
const text = document.querySelector('.form__text');
const amount = document.querySelector('.form__amount');

const localStorageTransaction = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransaction : [];

// Generate random ID
const generateID = () => Math.floor(Math.random() * 10000);

// Update local storage transactions
const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};

// Add transactions to DOM list
const addTransactionDOM = (transaction) => {
  // 1) Get sign
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');

  // 2) Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `${transaction.text}<span>${sign}${Math.abs(
    transaction.amount,
  )}</span><button class="delete-btn">x</button>`;

  item.setAttribute('data-id', transaction.id);
  list.append(item);
};

// Update the balance income and expense
const updateValues = () => {
  // Get amount value of each transaction and store in an array
  const amounts = transactions.map((transaction) => transaction.amount);

  // Calculate total balance
  let balanceTotal = 0;
  for (let i = 0; i < amounts.length; i++) {
    balanceTotal += amounts[i];
  }
  balanceTotal = balanceTotal.toFixed(2);

  // Calculate total income
  let incomeTotal = 0;
  const income = amounts.filter((item) => item > 0);
  for (let i = 0; i < income.length; i++) {
    incomeTotal += income[i];
  }
  incomeTotal = incomeTotal.toFixed(2);

  // Calculate total expense
  let expenseTotal = 0;
  const expense = amounts.filter((item) => item < 0);
  for (let i = 0; i < expense.length; i++) {
    expenseTotal += expense[i];
  }
  expenseTotal = expenseTotal.toFixed(2);

  balance.innerHTML = `$${balanceTotal}`;
  monyPlus.innerHTML = `$${incomeTotal}`;
  moneyMinus.innerHTML = `$${expenseTotal}`;
};

// Init app
const init = () => {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
};

// Remove transaction by ID number
const removeTransaction = (id) => {
  const filteredId = +id;
  transactions = transactions.filter((transaction) => transaction.id !== filteredId);
  updateLocalStorage();
  init();
};

// Add transaction to array and update the localStorage with new one
const addTransaction = (e) => {
  e.preventDefault();
  const textInputVal = text.value.trim();
  const amountInputVal = amount.value.trim();
  if (textInputVal === '' || amountInputVal === '') return;
  const transaction = {
    id: generateID(),
    text: textInputVal,
    amount: +amountInputVal,
  };
  transactions.push(transaction);
  addTransactionDOM(transaction);
  updateValues();
  updateLocalStorage();
  form.reset();
};

form.addEventListener('submit', addTransaction);
list.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const parentLi = e.target.closest('li');
    const { id } = parentLi.dataset;
    removeTransaction(id);
  }
});

init();
