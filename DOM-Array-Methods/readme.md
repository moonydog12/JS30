# DOM Array Methods

![image](../assets/image/dom-array-methods.jpg)

## Abstract

Select countries to get the exchange rate for a specific amount

### Project Specification

- Fetch random users from the randomuser.me API
- Use forEach() to loop and output user/wealth
- Use map() to double wealth
- Use filter() to filter only millionaires
- Use sort() to sort by wealth
- Use reduce() to add all wealth

## Note

### Steps break down

1. Fetch data from API and render UI with three users
2. Build different functions for relevant button with array methods
   - double Money
   - sort by richest
   - calculate total wealth
   - show only millionaire
3. Hook events

### JS

**Double Money**

```js
const doubleMoney = () => {
  persons = persons.map((person) => {
    person.money *= 2;
    return person;
  });
};
```

**Sort by richest**

In a concise body of an arrow function, only an expression is specified, which becomes the implicit return value.

```js
const sortByRichest = () => {
  // descending order
  persons.sort((a, b) => b.money - a.money);
};
```

**Filter only millionaires**

```js
const showMillionaires = () => {
  const oneMillion = 1000000;
  persons = persons.filter((person) => person.money > oneMillion);
};
```

**calculate total money**

```js
const calculateWealth = () => {
  const wealth = formatMoney(persons.reduce((acc, user) => (acc += user.money), 0));
};
```

## Summary

**Key learning points**

- Use ES6 `async/await` to execute asynchronous code(fetching data from API).
  d
- Use high order array methods for different purpose.

**Reference**

> [Array-cardio-day1](https://github.com/moonydog12/JavaScript-Armory/tree/main/Array-Cardio-Day1)
