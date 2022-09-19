# 用 JavaScript 更新 CSS 變數

## Abstract

用 JS & CSS 製作即時<img>濾鏡， 可以調整內距、模糊、邊框顏色。

## Content

### JavaScript 筆記

**步驟**

1. 設置 CSS 變數
2. 利用 addEventLinstener 來綁 HTML 的控制桿，並更新值到 CSS 變數中來達到即時調整的效果。

**Node list 迭代**

```javascript
// input node list(內含所有選取input的類陣列)
// forEach迭代每個元素
inputs.forEach((input) => {
  // 對每個元素進行操作
  input.addEventListener('change', handleUpdate);
});
```

**dataset**

`dataset` 可以取出對象的 data-\*屬性，也等同於 getAttribute

```javascript
<div id="test" data-no="123"></div>;
document.querySelector('#test').dataset.no; // 輸出123
document.querySelector('#test ').getAttribute('data-no'); // 輸出123
```

**element.setProperty( )**

等同於 style.cssPropertyName

```javascript
style.setProperty('padding', '15px');
/* 等同於 */
style.padding = '15px';
```

### CSS 筆記

使用 :root 儲存 CSS 變數，prefix 使用--(CSS 規定)。
(eg. --變數名稱

```CSS
:root {
    --base: #f7df1e;
}
```

### Summary

學習重點 :

- 取得文件根元素(:root)的參照
- 使用 JS 動態更新 CSS 變數

參閱:

> [MDN - setProperty](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty)
