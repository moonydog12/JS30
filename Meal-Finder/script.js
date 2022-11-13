const searchBtn = document.querySelector('#search');
const submitBtn = document.querySelector('#submit');
const randomBtn = document.querySelector('#random');
const mealsEl = document.querySelector('#meals');
const resultHeading = document.querySelector('#result-heading');
const singleMealEl = document.querySelector('#single-meal');

// Search meal and fetch from API
const searchMeal = (event) => {
  event.preventDefault();
  // Clear single meal
  singleMealEl.innerHTML = '';
  // Get search term
  const term = search.value;

  // Check for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        resultHeading.innerHTML = `<h2>Search results for '${term}':</h2> `;

        if (data.meals === null) {
          resultHeading.innerHTML = '<p>There are no search results. Try again!</p>';
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
          <div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="meal-info" data-mealID="${meal.idMeal}">
              <h3>${meal.strMeal}</h3>
            </div>
          </div>
          `,
            )
            .join('');
        }
      });

    // Clear search text
    search.value = '';
  } else {
    alert('Please enter a search value');
  }
};
// Add meal to DOM
const addMealToDOM = (meal) => {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    } else {
      break;
    }
  }

  singleMealEl.innerHTML = `
  <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
    <div class="single-meal-info">
      ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
      ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
    </div>
    <div class="main">
      <p>${meal.strInstructions}</p>
      <h2>Ingredients</h2>
      <ul>
        ${ingredients.map((ing) => `<li>${ing}</li>`).join('')}
      </ul>
    </div>
  </div>
  `;
};

// Fetch meal by ID
// www.themealdb.com/api/json/v1/1/lookup.php?i=52772
const getMealById = (mealID) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
};
// Fetch random meal
const getRandomMeal = () => {
  // Clear meals and heading
  mealsEl.innerHTML = '';
  resultHeading.innerHTML = '';
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
};
// Event listeners
submitBtn.addEventListener('submit', searchMeal);

randomBtn.addEventListener('click', getRandomMeal);

mealsEl.addEventListener('click', (event) => {
  const mealInfo = event.path.find((item) => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });
  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealID');
    getMealById(mealID);
  }
});
