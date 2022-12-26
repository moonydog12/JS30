// Selector
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModalButton = document.querySelector('.btn--close-modal');
const openModalButtons = [...document.querySelectorAll('.btn--show-modal')];

const scrollToBtn = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const nav = document.querySelector('.nav');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

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

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
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
document.querySelector('.nav__links').addEventListener('click', (event) => {
  // Matching
  if (!event.target.classList.contains('nav__link')) {
    return;
  }
  event.preventDefault();
  const id = event.target.getAttribute('href');
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
});

// Tabbed component
tabsContainer.addEventListener('click', (event) => {
  const clickedButton = event.target.closest('.operations__tab');
  const index = clickedButton.dataset.tab;
  const activeContent = document.querySelector(`.operations__content--${index}`);

  // Guard clause
  if (!clickedButton) {
    return;
  }

  // Active tab
  tabs.forEach((tab) => tab.classList.remove('operations__tab--active'));
  clickedButton.classList.add('operations__tab--active');

  // Active content area
  tabsContent.forEach((content) => content.classList.remove('operations__content--active'));
  activeContent.classList.add('operations__content--active');
});

// Menu fade animation
const handleMouseEvent = function handleMouseEvent(event) {
  // Delegation
  if (event.target.classList.contains('nav__link')) {
    const link = event.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach((el) => {
      const element = el;
      if (el === link) {
        return;
      }
      element.style.opacity = this;
      logo.style.opacity = this;
    });
  }
};

// note:Passing 'argument' into handler
nav.addEventListener('mouseover', handleMouseEvent.bind(0.5));
nav.addEventListener('mouseout', handleMouseEvent.bind(1));

// Sticky navigation
// note:getBoundingClientRect
// const initialCoords = section1.getBoundingClientRect();

// Vintage way : bad for performance(scroll event fire too frequently)
// window.addEventListener('scroll', () => {
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// Modern way: note:Intersection observer API
const observer = new IntersectionObserver();
