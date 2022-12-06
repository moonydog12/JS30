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

// Keep track of current card

let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Store card data
// const cardsData = [
//   { question: 'What must a variable begin with?', answer: 'A letter,$ or_' },
//   { question: 'What is a variable?', answer: 'Container for a piece of data' },
//   { question: 'What is a Number?', answer: 'A primitive type' },
// ];
const cardsData = getCardsData();

// Show number of cards
function updateCurrentText() {
  currentEl.innerHTML = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// Get cards from localstorage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
}

// Add card to localstorage
function setCardsData(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload();
}

// Create all cards
const createSingleCard = function (data, index) {
  const card = document.createElement('article');
  card.classList.add('card');
  if (index === 0) {
    card.classList.add('active');
  }

  card.innerHTML = `
    <div class="card__inner">
      <div class="card__front">
        <p>${data.question}</p>
      </div>
      <div class="card__back">
        <p>${data.answer}</p>
      </div>
    </div>
  `;

  card.addEventListener('click', () => {
    card.classList.toggle('showAnswer');
  });

  // Add to DOM
  cardsEl.push(card);
  cardsContainer.appendChild(card);
  updateCurrentText();
};

const createCards = function () {
  cardsData.forEach((data, index) => createSingleCard(data, index));
};

createCards();

// Listeners
nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left';

  currentActiveCard += 1;
  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = 'card active';
  updateCurrentText();
});

prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card right';

  currentActiveCard -= 1;
  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = 'card active';
  updateCurrentText();
});

// Show add container
showBtn.addEventListener('click', () => {
  addContainer.classList.add('show');
});

hideBtn.addEventListener('click', () => {
  addContainer.classList.remove('show');
});

// Add new card

addCardBtn.addEventListener('click', () => {
  const question = questionEl.value;
  const answer = answerEl.value;
  if (!question.trim() || !answer.trim()) return;
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
  cardsContainer.innerHTML = '';
  window.location.reload();
});
