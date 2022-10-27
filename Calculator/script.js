// Selectors
const mainScreen = document.querySelector('.main-screen');
const subScreen = document.querySelector('.sub-screen');
const deleteBtn = document.getElementById('deleteBtn');
const equalBtn = document.getElementById('equalBtn');
const clearBtn = document.getElementById('clearBtn');
const digitButtons = document.querySelectorAll('.digit-btn');
const operatorButtons = document.querySelectorAll('.operator-btn');

let firstNum;
let secondNum;
let operatorSymbol;
// Functions

// operator functions
const roundNumber = (num) => (num.toString().length >= 5 ? parseFloat(num).toFixed(2) : num);
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => roundNumber(a / b);

const compute = (a, b, operator) => {
  const num1 = +a;
  const num2 = +b;
  switch (operator) {
    case '+':
      return add(num1, num2);
    case '-':
      return subtract(num1, num2);
    case '×':
      return multiply(num1, num2);
    case '÷':
      return divide(num1, num2);
    default:
      return '';
  }
};

const deleteNumber = () => {
  mainScreen.innerHTML = mainScreen.innerHTML.toString().slice(0, -1);
};

const appendNumber = (e) => {
  mainScreen.textContent += e.target.textContent;
};

// Listeners
digitButtons.forEach((button) => {
  button.addEventListener('click', appendNumber);
});

operatorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    firstNum = mainScreen.textContent;
    operatorSymbol = button.textContent;
    subScreen.innerHTML = `${firstNum} ${operatorSymbol}`;
    mainScreen.textContent = '';
  });
});

clearBtn.addEventListener('click', () => {
  firstNum = null;
  secondNum = null;
  operatorSymbol = null;
  mainScreen.textContent = '';
  subScreen.textContent = '';
});

deleteBtn.addEventListener('click', deleteNumber);
equalBtn.addEventListener('click', () => {
  if (firstNum === null || secondNum === null) return 'No numbers';
  secondNum = mainScreen.textContent;
  const answer = compute(firstNum, secondNum, operatorSymbol);
  subScreen.innerHTML = '';
  secondNum = null;
  mainScreen.textContent = answer;
  firstNum = answer;
  return answer;
});
