# Key sequence detection

## Abstract

偵測使用者鍵盤輸入，當輸入字串等於先前設定的密碼時，觸發特定效果。

## Content

### JavaScript

- **Array.prototype.slice**

  回傳一個新陣列(原本陣列 begin 至 end)，原本的陣列不會被修改。

  語法 :

  `arr.slice([begin[, end]])`

  例子 :

  ```javascript
  let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  arr.slice(0, 3); // [0,1,2]
  arr.slice(3, 7); // [3,4,5,6]

  // 最後一個是 -1
  arr.slice(-3, -1); // [8,9]
  arr.slice(-5, -3); // [6,7]
  arr.slice(-3, -5); // []

  // 如果要擷取到最後一個
  arr.slice(-5, arr.length); // [6,7,8,9,0]
  ```

  > 參考資料 [MDN - Array slice](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

- 範例

  ```javascript
  // 偵測每一次 keyup 行為
  window.addEventListener('keyup', (e) => {
    // 擷取使用者最後輸入按鍵
    pressedKeys.push(e.key);
    let keySecret = pressedKeys
      .slice(-secretCode.length, pressedKeys.length)
      .join('');
    // something ...
  });
  ```

### CSS

```CSS
   h1 {
      display: none;
    }

    h1.active {
      color: red;
      display: block;
    }

```

```javascript
const modal = document.querySelector('h1');
window.addEventListener('keyup', (e) => {
  // something ...
  // 比對使用者輸入與預設密碼
  if (keySecret === secretCode) {
    // 若吻合，添加新的 class 到 modal element
    modal.classList.add('active');
  }
});
```
