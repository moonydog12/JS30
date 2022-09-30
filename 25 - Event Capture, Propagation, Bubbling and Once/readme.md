# Event Capture, Propagation, Bubbling

## Abstract

透過實例展示`Web API`事件傳遞機制，包含捕獲(Capture)、冒泡(bubbling)，以及 addEventListener 可使用的參數。

## Content

### 冒泡事件 (Bubbling)

當一個元素被觸發事件時，在它身上處理器（event handler）會先執行，接著是它的父層元素，然後是所有其它的上層元素也都會被觸發。

用本次課程舉例 :

```html
<div class="one">
  <div class="two">
    <div class="three"></div>
  </div>
</div>
```

```javascript
const blocks = document.querySelectorAll('div');

blocks.forEach((block) => block.addEventListener('click', logText, { capture: false }));

function logText(e) {
  console.log(this.classList.value);
}
```

當 `.three` 的 <div> 被點擊，`.three`的事件處理器先被觸發，接著依序觸發 `.two`、`.one` 的事件。事件就像氣泡從水中浮起來一樣從內部元素(inner element) 到父層(parents)。

![bubbling](https://i.imgur.com/Lnt9zvG.png)

### 捕獲事件 (Capturing)

另一個事件處理階段還有一個稱作[**捕獲**]的過程，在實務上較少被使用。

在標準的 DOM 事件中，event propagation 分成三個階段：

1. **Capturing Phase**：事件由外而內傳遞到被觸發事件的元素。
2. **Target Phase**：事件抵達被觸發事件的元素。
3. **Bubbling Phase**：事件從該元素透過冒泡從內而外傳遞。

![capturing](https://i.imgur.com/S0iVpQD.png)

要捕捉事件的捕獲階段, 需要設定事件處理器 `capture` 選項為 `true`:

```javascript
elem.addEventListener(..., {capture: true})
// or, just "true" is an alias to {capture: true}
elem.addEventListener(..., true)
```

```javascript
const blocks = document.querySelectorAll('div');

blocks.forEach(
  (block) => block.addEventListener('click', logText, { capture: true }) // 輸出 one two three
);

function logText(e) {
  console.log(this.classList.value);
}
```

## Summary

先捕獲，再冒泡。

參考資料 :

> [pjchender - note event propogation](https://pjchender.dev/webapis/note-event-capturing-bubbling/)
>
> [javascript.info - bubbling and capturing](https://javascript.info/bubbling-and-capturing)
