# Flex Panels Image Gallery

## Abstract

- CSS flexbox property
- CSS transition
- JavaScript event listener

## Content

### CSS flexbox property

flex :

CSS shorthand for:

- flex-grow
- flex-shrink
- flex-basis

設置 flex item 在 flex container 內的放大或縮小。

[MDN doc - flex](https://developer.mozilla.org/en-US/docs/Web/CSS/flex)

### CSS transition

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

[MDN DOC - CSS transition](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions)

### JavaScript event listener

toggleActive Fn 會在 transition 動畫結束後觸發。

```JavaScript
panels.forEach((panel) =>
  panel.addEventListener('transitionend', toggleActive)
);

```

e.propertyName 可以看到改變的屬性名稱

```JavaScript
function toggleActive(e) {
  if (e.propertyName.includes('flex')) {
    this.classList.toggle('active');
  }
}
```
