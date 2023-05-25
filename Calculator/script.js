const mainScreen = document.querySelector('.main-screen');
const subScreen = document.querySelector('.sub-screen');
const equalButton = document.querySelector('#equalBtn');
const deleteButton = document.querySelector('#deleteBtn');
const clearButton = document.querySelector('#clearBtn');
const digitButtons = document.querySelectorAll('.digit-btn');
const operatorButtons = document.querySelectorAll('.operator-btn');

let num1 = null;
let num2 = null;
let operator = null;
let shouldResetScreen = false;

// operate functions
const roundNumber = (num) => (num.toString().length >= 4 ? parseFloat(num).toFixed(2) : num);
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => roundNumber(a / b);

const calculate = (a, b, symbol) => {
  const firstNumber = parseInt(a, 10);
  const secondNumber = parseInt(b, 10);
  let solution;

  switch (symbol) {
    case '+':
      solution = add(firstNumber, secondNumber);
      break;
    case '-':
      solution = subtract(firstNumber, secondNumber);
      break;
    case '×':
      solution = multiply(firstNumber, secondNumber);
      break;
    case '÷':
      solution = divide(firstNumber, secondNumber);
      break;
    default:
      break;
  }
  return solution;
};

const resetScreen = () => {
  mainScreen.textContent = '';
  shouldResetScreen = false;
};

const evaluate = () => {
  if (operator === null) return;
  if (operator === '÷' && mainScreen.textContent === '0') return;
  num2 = mainScreen.textContent;
  mainScreen.textContent = calculate(num1, num2, operator);
  subScreen.textContent = `${num1} ${operator} ${num2} =`;
  operator = null;
};

const setOperator = (symbol) => {
  if (operator !== null) evaluate();
  num1 = mainScreen.textContent;
  operator = symbol;
  subScreen.textContent = `${num1} ${operator}`;
  mainScreen.textContent = '';
  shouldResetScreen = true;
};

const deleteNumber = () => {
  mainScreen.textContent = mainScreen.textContent.toString().slice(0, -1);
};

const allClear = () => {
  num1 = null;
  num2 = null;
  operator = null;
  mainScreen.textContent = '';
  subScreen.textContent = '';
};

// Listeners
digitButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    if (mainScreen.textContent === '0' || shouldResetScreen) resetScreen();
    mainScreen.textContent += event.target.textContent;
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener('click', () => setOperator(button.textContent));
});

equalButton.addEventListener('click', evaluate);

deleteButton.addEventListener('click', deleteNumber);
clearButton.addEventListener('click', allClear);
