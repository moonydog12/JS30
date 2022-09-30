const panels = document.querySelectorAll('.panel');
panels.forEach((panel) => panel.addEventListener('click', toggleOpen));

panels.forEach((panel) => panel.addEventListener('transitionend', toggleActive));

function toggleOpen() {
  this.classList.toggle('open');
}

function toggleActive(e) {
  console.log(e.propertyName);
  if (e.propertyName.includes('flex')) {
    console.log(this);
    this.classList.toggle('active');
  }
}
