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
// Modern way: note:Intersection observer API
const navbarHeight = nav.getBoundingClientRect().height;
const header = document.querySelector('.header');

const glueNavbar = (entries) => {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(glueNavbar, {
  root: null,
  threshold: 0,

  // Add navbar height to the target element,so navbar wont overlap the target
  rootMargin: `-${navbarHeight}px`,
});

headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll('.section');
const revealSection = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    return;
  }

  entry.target.classList.remove('section--hidden');

  // Stop observing the section
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading images
const imgTarget = document.querySelectorAll('img[data-src]');
const loadImg = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    return;
  }

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', () => {
    // Remove blur effect after image is actually loaded
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTarget.forEach((img) => imgObserver.observe(img));

// Slider component
const slider = () => {
  const slides = [...document.querySelectorAll('.slide')];
  const leftBtn = document.querySelector('.slider__btn--left');
  const rightBtn = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currentSlide = 0;
  const maxSlide = slides.length;

  const createDots = () => {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`,
      );
    });
  };

  const activateDot = (slide) => {
    document
      .querySelectorAll('.dots__dot')
      .forEach((dot) => dot.classList.remove('dots__dot--active'));

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  };

  const gotoSlide = (slide) => {
    slides.forEach((el, index) => {
      const currentEl = el;
      currentEl.style.transform = `translateX(${(index - slide) * 100}%)`;
    });
  };

  // Next slide
  const nextSlide = () => {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide += 1;
    }

    gotoSlide(currentSlide);
    activateDot(currentSlide);
  };

  const prevSlide = () => {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide -= 1;
    }

    gotoSlide(currentSlide);
    activateDot(currentSlide);
  };

  const initSlider = () => {
    createDots();
    activateDot(0);

    // Set initial slide
    gotoSlide(0);
  };

  initSlider();

  // Event handlers
  rightBtn.addEventListener('click', nextSlide);
  leftBtn.addEventListener('click', prevSlide);

  // Keyboard support
  document.addEventListener('keydown', (event) => {
    event.key === 'ArrowLeft' && prevSlide();
    event.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', (event) => {
    // Event delegation
    if (event.target.classList.contains('dots__dot')) {
      const { slide } = event.target.dataset;
      gotoSlide(slide);
      activateDot(slide);
    }
  });
};

slider();
