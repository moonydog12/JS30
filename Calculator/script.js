const mainScreen = document.querySelector('.main-screen');
const subScreen = document.querySelector('.sub-screen');
const buttonsContainer = document.querySelector('.buttons');
const equalBtn = document.querySelector('#equalBtn');
const deleteBtn = document.querySelector('#deleteBtn');
const clearBtn = document.querySelector('#clearBtn');

let num1 = null;
let num2 = null;
let operator = null;

// operate functions
const roundNumber = (num) => (num.toString().length >= 4 ? parseFloat(num).toFixed(2) : num);
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => roundNumber(a / b);

const calculate = (num1, num2, operator) => {
  const firstNumber = parseInt(num1);
  const secondNumber = parseInt(num2);
  const operations = {
    '+': add(firstNumber, secondNumber),
    '-': subtract(firstNumber, secondNumber),
    '×': multiply(firstNumber, secondNumber),
    '÷': divide(firstNumber, secondNumber),
  };
  return operations[operator];
};

const deleteNumber = () => {
  mainScreen.innerHTML = mainScreen.innerHTML.toString().slice(0, -1);
};

const clearAll = () => {
  num1 = null;
  num2 = null;
  operator = null;
  mainScreen.innerHTML = '';
  subScreen.innerHTML = '';
};

// Listeners
document.querySelectorAll('.digit-btn').forEach((btn) => {
  btn.addEventListener('click', (event) => {
    mainScreen.textContent += event.target.textContent;
  });
});

document.querySelectorAll('.operator-btn').forEach((btn) => {
  btn.addEventListener('click', (event) => {
    num1 = mainScreen.textContent;
    operator = event.target.textContent;
    subScreen.innerHTML = `${num1} ${operator}`;
    mainScreen.innerHTML = '';
  });
});

equalBtn.addEventListener('click', (event) => {
  num2 = mainScreen.innerHTML;

  if (!num1 || !num2) {
    alert('Missing numbers');
    return;
  }
  mainScreen.innerHTML = calculate(num1, num2, operator);
  num2 = null;
  num1 = null;
});

deleteBtn.addEventListener('click', deleteNumber);
clearBtn.addEventListener('click', clearAll);
