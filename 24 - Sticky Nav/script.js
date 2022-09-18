'use strict';
const navbar = document.querySelector('#main');
// 計算出 navbar 距離瀏覽器 viewport 上方的距離
const topOfNav = navbar.offsetTop;

window.addEventListener('scroll', fixNav);

function fixNav() {
  if (window.scrollY >= topOfNav) {
    // offset fixed navbar height
    document.body.classList.add('fixed-nav');
    document.body.style.paddingTop = navbar.offsetHeight + 'px';
  } else {
    document.body.style.paddingTop = 0;
    document.body.classList.remove('fixed-nav');
  }
}
