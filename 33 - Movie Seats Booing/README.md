# Movie Seat-Booking

![image](../assets/image/movie-seat.jpg)

## Abstract

Display movie choices and seats in a theater to select from to purchase tickets

**Project Specifications :**

- Display UI with movie selection, screen, seats, legend & seat info
- Users can select a movie/price
- Users can select/deselect seats, but users can't select occupied seats
- The number of seats and price will update
- Save seats, movies and prices to local storage so that UI is still populated on refresh

## Steps

1. Select relevant elements
2. Build supporting functions
   - Save selected movie index & price
   - Update total and count on UI
   - Get data from localStorage & populate UI
3. Hook event listeners
4. Initial count and total set

## Note

### JavaScript

**Save data to localStorage :**

```js
const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
};
```

**Get data from localStorage :**

```js
const populateUI = () => {
  // Parses a JSON string,
  // construct the JavaScript value or object described by the string.
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      // Check if the index exists in the selectedSeats array
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
```

**Event Delegate :**

```js
const container = document.querySelector('.container');

container.addEventListener('click', (e) => {
  // Event Delegate
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    // ...
  }
});
```

In the sample code, we add the listener function to the container. And use conditional expressions to examine the event target. If the target matched the condition, execute the code block.

The sample could be rewritten :

```js
const seats = document.querySelectorAll('.container .seat:not(.occupied)');

seats.forEach((seat) => {
  seat.addEventListener('click', callback);
});
```

However, using event delegates is more performant.

## Summary

- Use local storage to store data and get them after refreshing the browser
- Use event delegate to replace array for hooking events

Reference :

> [JavaScript.info - Event delegation](https://javascript.info/event-delegation)
>
> [JavaScript.info - LocalStorage, sessionStorage](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice)
