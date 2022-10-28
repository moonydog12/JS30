# Exchange Rate Calculator

![image](../assets/image/exchange.jpg)

## Abstract

Select countries to get the exchange rate for a specific amount

### Project Specification

- Display UI with 2 select lists for countries and 2 inputs for amounts
- Fetch exchange rates from API (https://api.exchangerate- api.com)
- Display the values for both countries
- Update values on the amount of change
- Swap country rates

## Note

### Steps break down

1. Generate input field options using JavaScript
2. Fetch data from API and update the UI
3. Hook our functions with elements

**Use JS to generate UI**

```js
// Supporting function
const generateOptionEl = (countryName, parentNode) => {
  const optionEl = document.createElement('option');
  optionEl.setAttribute('name', countryName);
  optionEl.innerText = countryName;
  // if the parentNode matched, set the 'TWD' option el as selected
  if (parentNode === currencyTwo && countryName === 'TWD') {
    optionEl.setAttribute('selected', true);
  }
  parentNode.append(optionEl);
};

// Allow manually add new countries
const countries = ['HKD', 'JPY', 'TWD', 'USD', 'EUR', 'GBP', 'CNY', 'KRW', 'CHF'];
// Use callback function in array method
// compare the first letter of each string
const sortAlphabetically = (countryA, countryB) => (countryA[0] > countryB[0] ? -1 : 1);
```

In the original project, the author wrote more than 100 lines of HTML for option elements. I try to write JS to omit redundant HTML codes. I use the callback function in array methods which makes it more readable.

**Fetch API**

There are various approaches to fetching data asynchronously in JavaScript.

`Promise chain` :

```JS
const calculateRateWithFetch = () => {
  const currencyOneValue = currencyOne.value;
  fetch(`https://open.exchangerate-api.com/v6/latest/${currencyOneValue}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[currencyTwoValue];
      amountTwo.value = (amountOne.value * rate).toFixed(2);
    });
};
```

`Async/Await` :

```js
// Don't forget the async keyword
const calculateRate = async () => {
  const currencyOneValue = currencyOne.value;

  let currencyData = await fetch(`https://open.exchangerate-api.com/v6/latest/${currencyOneValue}`);
  currencyData = await currencyData.json();
  const rate = currencyData.rates[currencyTwoValue];
  amountTwo.value = (amountOne.value * rate).toFixed(2);
};
```

I prefer the second approach because I think it makes the code more like the original synchronous JavaScript code. It is more understandable and prevents the [Callback Hell][callback-hell].

## Summary

**Key learning points**

- Use ES6 `async/await` to execute asynchronous code.
- Callback functions are useful

**Reference**

> [Promise][promise]
>
> [Async/await][async/await]
>
> [Callback hell][callback-hell]

[callback-hell]: https://www.wfublog.com/2020/10/js-asynchronous-callback-hell-fetch-promise-api.html
[promise]: https://javascript.info/promise-basics
[async/await]: https://javascript.info/async-await
