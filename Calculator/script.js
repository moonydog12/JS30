const mainScreen = document.querySelector('.main-screen');
const subScreen = document.querySelector('.sub-screen');
const buttonsContainer = document.querySelector('.buttons');
const equalBtn = document.querySelector('#equalBtn');
const deleteBtn = document.querySelector('#deleteBtn');
const clearBtn = document.querySelector('#clearBtn');

let firstValue = '';
let secondValue = '';
let symbol = '';

// Functions
// operate functions
const roundNumber = (num) => (num.toString().length >= 5 ? parseFloat(num).toFixed(2) : num);
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => roundNumber(a / b);

const calculate = (a, b, operator) => {
  const num1 = +a;
  const num2 = +b;
  const operations = {
    '+': add(num1, num2),
    '-': subtract(num1, num2),
    '×': multiply(num1, num2),
    '÷': divide(num1, num2),
  };
  return operations[operator];
};

// Delete one digit when user click delete button
const deleteNumber = () => {
  mainScreen.innerHTML = mainScreen.innerHTML.toString().slice(0, -1);
};

const appendNumber = (num) => {
  mainScreen.textContent += num;
};

const clearAll = () => {
  firstValue = null;
  secondValue = null;
  symbol = null;
  mainScreen.innerHTML = '';
  subScreen.innerHTML = '';
};

// Listeners
buttonsContainer.addEventListener('click', (event) => {
  if (event.target.matches('.digit-btn')) {
    const number = event.target.textContent;
    appendNumber(number);
    firstValue = mainScreen.textContent;
  }
});

buttonsContainer.addEventListener('click', (event) => {
  if (event.target.matches('.operator-btn')) {
  }
});

deleteBtn.addEventListener('click', deleteNumber);
clearBtn.addEventListener('click', clearAll);
