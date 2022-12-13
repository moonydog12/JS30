const cardsContainer = document.querySelector('.cards');
const prevBtn = document.querySelector('.btn-prev');
const nextBtn = document.querySelector('.btn-next');
const currentEl = document.querySelector('.nav__current');
const showBtn = document.querySelector('#show');
const hideBtn = document.querySelector('#hide');
const questionEl = document.querySelector('#question');
const answerEl = document.querySelector('#answer');
const addCardBtn = document.querySelector('.addon-btn');
const clearBtn = document.querySelector('.btn-clear');
const addContainer = document.querySelector('.addon');

// Keep track of current card / DOM cards
let currentActiveCard = 0;
const cardsEl = [];

// Show number of cards
const updateCurrentText = () => {
  currentEl.innerHTML = `${currentActiveCard + 1}/${cardsEl.length}`;
};

// Get card data from local-storage
const getCardsData = () => {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
};

const cardsData = getCardsData();

// Add card to local-storage
const setCardsData = (cards) => {
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload();
};

// Create all cards
const createSingleCard = (data, index) => {
  const card = document.createElement('article');
  card.classList.add('card');
  if (index === 0) card.classList.add('active');

  card.innerHTML = `
    <div class="card__inner">
      <div class="card__front">
        <p class="card__content">${data.question}</p>
      </div>
      <div class="card__back">
        <p class="card__content">${data.answer}</p>
      </div>
    </div>
  `;

  card.addEventListener('click', () => {
    card.classList.toggle('showAnswer');
  });

  // Render card to DOM
  cardsEl.push(card);
  cardsContainer.appendChild(card);
  updateCurrentText();
};

const createCards = () => cardsData.forEach((data, index) => createSingleCard(data, index));

createCards();

// Listeners
nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left';

  currentActiveCard += 1;
  if (currentActiveCard > cardsEl.length - 1) currentActiveCard = cardsEl.length - 1;

  cardsEl[currentActiveCard].className = 'card active';
  updateCurrentText();
});

prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card right';

  currentActiveCard -= 1;
  if (currentActiveCard < 0) currentActiveCard = 0;

  cardsEl[currentActiveCard].className = 'card active';
  updateCurrentText();
});

// Show/hide add container
showBtn.addEventListener('click', () => {
  addContainer.classList.add('show');
});

hideBtn.addEventListener('click', () => {
  addContainer.classList.remove('show');
});

// Add new card
addCardBtn.addEventListener('click', () => {
  const question = questionEl.value.trim();
  const answer = answerEl.value.trim();
  if (!question || !answer) return;
  const newCard = { question, answer };
  createSingleCard(newCard);
  questionEl.value = '';
  answerEl.value = '';
  addContainer.classList.remove('show');
  cardsData.push(newCard);
  setCardsData(cardsData);
});

// clear cards button
clearBtn.addEventListener('click', () => {
  localStorage.clear();

  // remove all cards
  cardsContainer.innerHTML = '';
  window.location.reload();
});
