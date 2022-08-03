# Hold Shift and Check Checkboxes

## Abstract

實作點擊 checkbox 之後按下 shift 鍵，一次選取多個 checkbox 的功能。

Techniques

- Selector & Listener
- Boolean value

## Content

1. 選取目標元素，並監聽 `click` 事件。

   ```JS
   const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');

   checkboxes.forEach((checkbox) => {
   checkbox.addEventListener('click', handleCheck);
   });
   ```

1. handleCheck function。

   邏輯：定義最後一個點擊的是 lastChecked，用 inBetween 當做在兩個 checkbox 之間的 checkbox 狀態，若在兩個之間為 true, 其他則為 false。所以最後只要判斷 inBetween 為 true 時打勾。

   ```javascript
   let lastChecked;

   function handleCheck(e) {
     let inBetween = false;
     // 檢查是否按著 shift 鍵 && 元素是否被checked。
     if (e.shiftKey && this.checked) {
       // 迭代每一個checkbox。
       checkboxes.forEach((checkbox) => {
         // 若點擊的checkbox是目前元素 || checkbox 是上一個點擊的元素
         if (checkbox === this || checkbox === lastChecked) {
           inBetween = !inBetween;
         }
         if (inBetween) {
           checkbox.checked = true;
         }
       });
     }
     lastChecked = this;
   }
   ```
