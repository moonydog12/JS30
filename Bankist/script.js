// Selector
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModalButton = document.querySelector('.btn--close-modal');
const openModalButtons = [...document.querySelectorAll('.btn--show-modal')];

const scrollToBtn = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// Modal window
const openModal = (event) => {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

closeModalButton.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

openModalButtons.forEach((button) => button.addEventListener('click', openModal));

document.addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Smooth scrolling
scrollToBtn.addEventListener('click', () => {
  // Modern way
  // section1.scrollIntoView({ behavior: 'smooth' });

  // Vintage way
  const s1coords = section1.getBoundingClientRect();
  window.scrollTo({
    left: s1coords.left + window.scrollX,
    top: s1coords.top + window.scrollY,
    behavior: 'smooth',
  });
});

/* Page navigation(Implement event delegation)
 1) Add event listener to common parent element
 2) Determine what element originated the event */
document.querySelector('.nav__links').addEventListener('click', (ev) => {
  // Matching
  if (!ev.target.classList.contains('nav__link')) {
    return;
  }
  ev.preventDefault();
  const id = ev.target.getAttribute('href');
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
});
