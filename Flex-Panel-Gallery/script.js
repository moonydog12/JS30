const panels = document.querySelectorAll('.panel');

const toggleOpen = function openPanel() {
  this.classList.toggle('open');
};

const toggleActive = function activateEffect(e) {
  if (e.propertyName.includes('flex')) {
    this.classList.toggle('active');
  }
};

// Event Listeners
panels.forEach((panel) => panel.addEventListener('click', toggleOpen));
panels.forEach((panel) => panel.addEventListener('transitionend', toggleActive));
