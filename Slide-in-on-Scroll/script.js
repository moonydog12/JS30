const sliderImages = document.querySelectorAll('.slide-in');

// 讓函式在一定時間內只能觸發一次
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function checkSLide() {
  sliderImages.forEach((sliderImage) => {
    const slideInAt = window.scrollY + window.innerHeight - sliderImage.height / 2; // 圖片一半的位置
    const imageBottom = sliderImage.offsetTop + sliderImage.height; // 圖片底部位置
    const isHalfShown = slideInAt > sliderImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;

    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add('active');
    } else {
      sliderImage.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', debounce(checkSLide));
