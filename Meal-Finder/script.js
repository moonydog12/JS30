const searchInput = document.querySelector('#search');
const submitBtn = document.querySelector('#submit');
const randomBtn = document.querySelector('#random');
const mealsEl = document.querySelector('#meals');
const resultHeading = document.querySelector('#result-heading');
const singleMealEl = document.querySelector('#single-meal');

// Search meal and fetch from API

const searchMeal = async (event) => {
  event.preventDefault();

  // Clear single meal HTML content
  singleMealEl.innerHTML = '';
  mealsEl.innerHTML = '';

  // Get search string from the input
  const term = searchInput.value.trim();
  if (!term) return;
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
  const data = await response.json();

  if (data.meals) {
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
  } else {
    resultHeading.innerHTML = `<p>There are no search results of ${term}, please try again!</p>`;
  }

  // Clear search text
  searchInput.value = '';
};

// Generate HTML template and insert meal information into it

const addMealToDOM = (meal) => {
  const ingredients = [];
  const IngredientsCount = 100;
  for (let i = 1; i <= IngredientsCount; i++) {
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

const getMealById = async (mealID) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
  const data = await response.json();
  const [mealData] = data.meals;
  addMealToDOM(mealData);
};

// Fetch random meal

const getRandomMeal = async () => {
  // Clear meals and heading
  mealsEl.innerHTML = '';
  resultHeading.innerHTML = '';
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const data = await response.json();
  const [mealData] = data.meals;
  addMealToDOM(mealData);
};

// Listeners

submitBtn.addEventListener('submit', searchMeal);
randomBtn.addEventListener('click', getRandomMeal);
mealsEl.addEventListener('click', (event) => {
  const mealInfo = event.composedPath().find((item) => item.classList?.contains('meal-info'));
  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealID');
    getMealById(mealID);
  }
});
