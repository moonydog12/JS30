const currencyOne = document.querySelector('#currency-one');
const currencyTwo = document.querySelector('#currency-two');
const amountOne = document.querySelector('#amount-one');
const amountTwo = document.querySelector('#amount-two');

const rateEl = document.querySelector('#rate');
const swapBtn = document.querySelector('#swap');

// Functions
// Generate UI
const generateOptionEl = (countryName, parentNode) => {
  const optionEl = document.createElement('option');
  optionEl.setAttribute('name', countryName);
  optionEl.innerText = countryName;
  if (parentNode === currencyTwo && countryName === 'TWD') {
    optionEl.setAttribute('selected', true);
  }
  parentNode.append(optionEl);
};

const countries = ['HKD', 'JPY', 'TWD', 'USD', 'EUR', 'GBP', 'CNY', 'KRW', 'CHF'];
const sortAlphabetically = (countryA, countryB) => (countryA[0] > countryB[0] ? -1 : 1);
countries.sort(sortAlphabetically);
countries.forEach((country) => {
  generateOptionEl(country, currencyOne);
  generateOptionEl(country, currencyTwo);
});

// Fetch exchange rates and update DOM (Async/Await)
const calculateRate = async () => {
  const currencyOneValue = currencyOne.value;
  const currencyTwoValue = currencyTwo.value;

  let currencyData = await fetch(`https://open.exchangerate-api.com/v6/latest/${currencyOneValue}`);
  currencyData = await currencyData.json();
  const rate = currencyData.rates[currencyTwoValue];
  rateEl.textContent = `1 ${currencyOneValue} = ${rate} ${currencyTwoValue}`;
  amountTwo.value = (amountOne.value * rate).toFixed(2);
};

// Event listeners

currencyOne.addEventListener('change', calculateRate);
currencyTwo.addEventListener('change', calculateRate);
amountOne.addEventListener('input', calculateRate);
amountTwo.addEventListener('input', calculateRate);

swapBtn.addEventListener('click', () => {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculateRate();
});
