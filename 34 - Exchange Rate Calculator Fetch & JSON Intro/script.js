const currencyOne = document.querySelector('#currency-one');
const currencyTwo = document.querySelector('#currency-two');
const amountOne = document.querySelector('#amount-one');
const amountTwo = document.querySelector('#amount-two');

const rateEl = document.querySelector('#rate');
const swapBtn = document.querySelector('#swap');
const countries = ['HKD', 'JPY', 'TWD', 'USD', 'EUR', 'GBP', 'CNY', 'KRW', 'CHF'];
countries.sort((a, b) => (a[0] > b[0] ? 1 : -1));
// Functions
// Generate UI
countries.forEach((country) => {
  const optionEl = document.createElement('option');
  optionEl.setAttribute('name', country);
  optionEl.innerText = country;
  currencyOne.append(optionEl);
});

countries.forEach((country) => {
  const optionEl = document.createElement('option');
  if (country === 'TWD') {
    optionEl.setAttribute('selected', true);
  }
  optionEl.setAttribute('name', country);
  optionEl.innerText = country;
  currencyTwo.append(optionEl);
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

// Fetch exchange rates and update DOM (Promise chain)

// const calculateRateWithFetch = () => {
//   const currencyOneValue = currencyOne.value;
//   const currencyTwoValue = currencyTwo.value;
//   fetch(`https://open.exchangerate-api.com/v6/latest/${currencyOneValue}`)
//     .then((res) => res.json())
//     .then((data) => {
//       const rate = data.rates[currencyTwoValue];
//       rateEl.textContent = `1 ${currencyOneValue} = ${rate} ${currencyTwoValue}`;
//       amountTwo.value = (amountOne.value * rate).toFixed(2);
//     });
// };

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
