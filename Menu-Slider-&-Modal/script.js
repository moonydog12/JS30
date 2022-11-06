const toggle = document.querySelector('#toggle');
const closeBtn = document.querySelector('#close');
const openBtn = document.querySelector('#open');
const modal = document.querySelector('.modal-container');

toggle.addEventListener('click', () => {
  document.body.classList.toggle('show-nav');
});

openBtn.addEventListener('click', () => {
  modal.classList.add('show-modal');
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('show-modal');
});

// Hide modal on outside click
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show-modal');
  }
});
