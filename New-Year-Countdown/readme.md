## New Year Countdown

![New Year Countdown](../assets/image/firework.webp)

Landing page that counts down from the current date to the next new year

## Project Specifications

- Create landing page with HTML/CSS
- Calculate the days, hours, mins and seconds to the new year
- Insert values into the DOM
- Show a spinner right before loading the countdown
- Show the coming year in the background

## Note

### JS

**Calculate the days, hours, mins and seconds to the new year:**

```js
function updateCountdown() {
  // Get the relevant time data using built-in Date object
  const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);
  const currentTime = new Date();

  // Compute the deviation of new year and current time

  const deviation = newYearTime - currentTime;

  const HOUR_PER_DAY = 24;
  const MINUTE_PER_HOUR = 60;
  const SECOND_PER_MINUTE = 60;

  // The unit of result would be millisecond, need to convert it
  const day = Math.floor(
    deviation / PER_SECOND / SECOND_PER_MINUTE / MINUTE_PER_HOUR / HOUR_PER_DAY,
  );
  const hour =
    Math.floor(deviation / PER_SECOND / SECOND_PER_MINUTE / MINUTE_PER_HOUR) % HOUR_PER_DAY;
  const minute = Math.floor(deviation / PER_SECOND / SECOND_PER_MINUTE) % MINUTE_PER_HOUR;
  const second = Math.floor(deviation / PER_SECOND) % SECOND_PER_MINUTE;
}
```

**Insert values into the DOM:**

Use conditional(ternary) operator to compute value

```js
// Parameters are the converted value in `updateCountdown`
const InsertToDOM = (day, hour, minute, second) => {
  daysEl.innerHTML = day;

  // Ternary operator
  hoursEl.innerHTML = hour < 10 ? `0${hour}` : hour;
  minutesEl.innerHTML = minute < 10 ? `0${minute}` : minute;
  secondsEl.innerHTML = second < 10 ? `0${second}` : second;
};
```

### CSS

**Show a spinner right before loading the countdown:**

The function sets a 2-second timer after loading the page

```js
setTimeout(() => {
  // removes the element from the DOM
  spinner.remove();

  // Show the countdown element
  countdown.style.display = 'grid';
}, 2 * PER_SECOND);
```

Teacher Brad chose gif for the loader, I implement it by CSS. And I find one CSS guru who build 100 loaders, I will attach the reference in the Summary.

```CSS
/* Spinner element and loading animation */
.spinner {
  /* Many other properties!!! 😲 */

  /* Setting the animation */
  animation: spin 1s infinite steps(10);
}

@keyframes spin {
  to {
    transform: rotate(1turn);
  }
}
```

## Summary

**🗝️Key points**

- JavaScript built-in Date object and how to convert it
- Loader effect using CSS
- setTimeout()/setInterval()

**💡References**

[MDN - Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

[MDN - Ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)

[Temani Afif-100 css loaders](https://dev.to/afif/i-made-100-css-loaders-for-your-next-project-4eje)
