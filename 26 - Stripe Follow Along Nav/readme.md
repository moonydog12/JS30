# Stripe follow along nav

## Abstract

利用 JavaScript & CSS 動畫製作選單特效，當滑鼠移動至超連結下方，會呈現預先製作的背景版及連結內容。

概念類似 project-22 自訂樣式跟著滑鼠移動的效果。

## Content

### 步驟

1. 預先寫好 CSS 的背景樣板(課程中老師已經先幫我們寫好`dropdownBackground` 、 `dropdownBackground.open` 兩個 class)
1. 選擇元素 & 建立事件監聽使用的 function
1. 實作 function 效果

### JavaScript 筆記

**滑鼠事件:**

```javascript
// 滑鼠移動到元素觸發的事件
function handleEnter() {
  this.classList.add('trigger-enter');
  setTimeout(() => {
    // 如果目前元素的 class 包含 trigger-enter ， 0.2秒後新增 trigger-enter-active 給目標元素
    if (this.classList.contains('trigger-enter')) {
      this.classList.add('trigger-enter-active');
    }
  }, 200);
  background.classList.add('open');

  const dropdown = this.querySelector('.dropdown');
  // 取得相關元素的定位與資訊
  const dropdownCords = dropdown.getBoundingClientRect();
  const navCords = nav.getBoundingClientRect();

  // 用JS取得元素定位
  const coords = {
    height: dropdownCords.height,
    width: dropdownCords.width,
    // 要減去nav的定位，避免上方區塊增加時造成的錯位
    top: dropdownCords.top - navCords.top,
    left: dropdownCords.left - navCords.left,
  };

  // 設定滑動背景modal的定位與大小
  background.style.setProperty('width', coords.width + 'px');
  background.style.setProperty('height', coords.height + 'px');
  background.style.setProperty('transform', `translate(${coords.left}px,${coords.top}px)`);
}
```

概念就如同先前做過的自訂樣式隨滑鼠移動效果，需要注意的是因為不確定以後是否會新增其他區塊，造成錯位跑版，所以採用 JavaScript 去動態的取得元素的定位再減去新增區塊的高與寬。移出的效果就沒有那麼複雜了，單純的移除被 `handleEnter` 加上的那些 class 就完成了。

### CSS 筆記

以下都是使用 JS 動態新增 className 會觸發的 CSS 效果，雖然老師已經預先寫好，

但如果要做出類似的效果，必須具備一定的 CSS 能力。

```CSS
.trigger-enter .dropdown {
  display: block;
}

.trigger-enter-active .dropdown {
  opacity: 1;
}

.trigger-enter .dropdown {
  display: block;
}

.dropdownBackground {
  width: 100px;
  height: 100px;
  position: absolute;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 50px 100px rgba(50, 50, 93, 0.1),
    0 15px 35px rgba(50, 50, 93, 0.15), 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.4s, opacity 0.1s, transform 0.2s;
  transform-origin: 50% 0;
  display: flex;
  justify-content: center;
  opacity: 0;
}

.dropdownBackground.open {
  opacity: 1;
}

```

## Summary

雖然課程教的是 JavaScript，要在瀏覽器上實作出動畫效果，

良好的 HTML 結構以及 CSS 排版的技巧都是不可或缺的。

參考資料:

參考之前 Project 有關 `Element.getBoundingClientRect()` MDN 的說明文張
