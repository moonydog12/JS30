# Flex Panels Image Gallery

## Abstract

製作一個點擊圖片後會展開的展示效果。比起 JavaScript ， 這個小作品更著重 CSS 的應用。

## Content

### JavaScript 語法

**步驟**

1. 取得所有 panel 的節點，
2. 實作 toggle()，藉由 `classList.toggle` 來新增/移除目標元素的類別。
3. 監聽事件(`transitionend`)

**JavaScript event listener :**

函式會在 transition 動畫結束後觸發。

```javascript
panels.forEach((panel) =>
  panel.addEventListener('transitionend', toggleActive)
);
```

`e.propertyName` 可以取得觸發 `transitionend` 而改變的屬性名稱，而 `.open` 觸發的屬性有 `font-size` 、 `flex`。所以要使用判斷式來判斷進來的是不是`flex。

```javascript
function toggleActive(e) {
  if (e.propertyName.includes('flex')) {
    this.classList.toggle('active');
  }
}
```

### CSS 語法

**flex :**

是以下這些 CSS 屬性的簡寫，設置 flex item 在 flex 容器內的放大或縮小。

- flex-grow
- flex-shrink
- flex-basis

**CSS transition**

CSS property 改變時， transition 提供方式來改變動畫速度

Sample 1 :

```css
.panel {
  /* 設定動畫改變的屬性 */
  transition: font-size 0.7s cubic-bezier(0.61, -0.19, 0.7, -0.11), flex 0.7s
      cubic-bezier(0.61, -0.19, 0.7, -0.11), background 0.2s;
}

.panel.open {
  font-size: 40px;
  flex: 5;
}
```

Sample 2 :

```CSS
.panel > * {
  /* 設定 transform 屬性動畫 秒數 0.5s */
  transition: transform 0.5s;
}

.panel.active > *:first-child {
  transform: translateY(0);
}
```

**CSS 偽類別**

加在CSS選擇器後面的關鍵字(keyword)，用來指定所選元素特殊狀態時的樣式。

這個作品使用了兩個偽類別

- :first-child

  取得 siblings 元素中的第一個。

- :last-child

  取得 siblings 元素中的最後一個。

```Css
.panel > *:first-child {
  transform: translateY(-100%);
}
.panel.active > *:first-child {
  transform: translateY(0);
}
.panel > *:last-child {
  transform: translateY(100%);
}
.panel.active > *:last-child {
  transform: translateY(0);
}
```

```html
<div class="panel panel5">
	<p>Life</p> <!-- .panel > *:first-child 選到這個  -->
	<p>In</p>
	<p>Motion</p> <!-- .panel > *:last-child 選到這個  -->
</div>
```

## Summary

學習重點:

- CSS flexbox 語法
- CSS transition 語法
- JavaScript event listener

參閱

> [MDN doc - flex](https://developer.mozilla.org/en-US/docs/Web/CSS/flex) > [MDN DOC - CSS transition](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions)
>
> [MDN doc - pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes)
