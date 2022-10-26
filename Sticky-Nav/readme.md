# Sticky Navbar

![image](../assets/image/glue.jpg)

## Abstract

透過 JavaScript & CSS 的`position:fixed` 製作置頂選單( Navbar )。

## Content

### JavaScript

這次的 JavaScript 比較簡單，就是偵測元素位置，滿足條件式後為<body>新增 `fixed-nav` 類別，然後所有加上 `fixed-nav` 前綴的類別就會觸發相對應的效果。

**步驟**

1. 偵測選單元素到頂部的高度
2. 新增樣式 fixed-nav (CSS)
3. 進行網頁捲軸高度偵測，決定是否變更選單樣式

**偵測選單元素到頂部的高度**

```javascript
const navbar = document.querySelector('#main');
// 計算出 navbar 距離瀏覽器 viewport 上方的距離
const topOfNav = navbar.offsetTop;
```

**進行網頁捲軸高度偵測，決定是否變更選單樣式**

```javascript
function fixNav() {
  if (window.scrollY >= topOfNav) {
    /* offset fixed navbar height
       因為當position被設定為fixed時，將不會再佔據原有的高度。
       所以要動態的增加一個offsetHeight來將內容部位增高避免怪異的彈跳遮擋現象  */
    document.body.style.paddingTop = navbar.offsetHeight + 'px';
    document.body.classList.add('fixed-nav');
  } else {
    document.body.style.paddingTop = 0;
    document.body.classList.remove('fixed-nav');
  }
}

window.addEventListener('scroll', fixNav);
```

### CSS

要注意的是元素如果使用 `width : auto`來寫元素寬度，會沒辦法使用 transition 動畫效果。

**預先寫好 transition 的效果、秒數**

```css
.site-wrap {
  transform: scale(0.9);
  transition: transform 0.5s;
}

nav {
  transition: all 0.5s;
  position: relative;
}

li.logo {
  max-width: 0;
  transition: all 600ms;
}
```

**新增樣式 fixed-nav**

```css
.fixed-nav .site-wrap {
  transform: scale(1.2);
}

.fixed-nav nav {
  position: fixed; /* 元素離開一般元件流(normal document flow) */
  box-shadow: 0 5px rgba(0, 0, 0, 0.1);
}

.fixed-nav li.logo {
  /* width auto 無法使用 transition 動畫 */
  /* width: auto; */
  max-width: 500px;
}
```

## Summary

- 使用 Web API 找出元素於 browser 的相對位置
- CSS fixed position & transition 效果

參閱 :

[MDN - CSS position](https://developer.mozilla.org/en-US/docs/Web/CSS/position)
