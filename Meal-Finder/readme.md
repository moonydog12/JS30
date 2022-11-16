# Meal Finder

![image](../assets/image/meal-finder.jpg)

Search and generate random meals from the themealdb.com API

## Project Specifications

- Display UI with form to search and button to generate
- Connect to API and get meals
- Display meals in DOM with image and hover effect
- Click on meal and see the details
- Click on generate button and fetch & display a random meal

## Note

**Connect to API and get meals**

We usually use async/await to fetch data from 3rd party API or achieve asynchronous tasks, browser will execute async/await code behind the scene. Therefore,our code won't be blocked.

```js
const searchMeal = async (event) => {
  // Get search string from the text input
  const term = searchInput.value.trim();
  if (term) {
    // Use async/await to handle asynchronous tasks

    // 1) Get data from 3rd party API
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    const data = await response.json();

    // 2) If meal data exists, do something
    if (data.meals) {
      // Insert data meals information into DOM template
    } else {
      // Generate warning DOM to imply user
    }
  }
};
```

**Click on meal and see the details**

The `composedPath()` method of the Event interface returns array of objects on which an event listener will be invoked(in this case,`mealsEl`).
In the case, we loop through every element in the returned array,and look for element with 'meal-info' class. If it existed, we get its ID from HTML `data attribute` and render it.

```js
mealsEl.addEventListener('click', (event) => {
  const mealInfo = event.composedPath().find((item) => item.classList?.contains('meal-info'));
  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealID');
    getMealById(mealID);
  }
});
```

**Click on generate button and fetch & display a random meal**

```js
const getRandomMeal = async () => {
  // 1) Fetch data from provided API
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const data = await response.json();

  // 2) Use array destructure to get the first element of an array
  const [mealData] = data.meals;

  // 3) Render it to DOM
  addMealToDOM(mealData);
};
```

## Summary

**Key points**

- Asynchronous JavaScript
- Event.composedPath()

**Reference:**

>[modern js info - Async/await ](https://javascript.info/async-await)
> 
>[MDN - Asynchronous](https://developer.mozilla.org/en-US/docs/Glossary/Asynchronous)
> 
>[MDN - composedPath](https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath)