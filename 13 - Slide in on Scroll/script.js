const sliderImages = document.querySelectorAll('.slide-in');
function checkSLide(e) {
  sliderImages.forEach((sliderImage) => {
    const slideInAt =
      window.scrollY + window.innerHeight - sliderImage.height / 2; // 圖片一半的位置
    const imageBottom = sliderImage.offsetTop + sliderImage.height; // 圖片底部位置
    const isHalfShown = slideInAt > sliderImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;
    isHalfShown && isNotScrolledPast
      ? sliderImage.classList.add('active')
      : sliderImage.classList.remove('active');
  });
}

window.addEventListener('scroll', debounce(checkSLide));

/**
  debounce function
  讓某函式在一定時間內只能觸發一次，目的是提升效能
**/
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function () {
    let context = this,
      args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
