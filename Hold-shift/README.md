# Hold Shift and Check Checkboxes

![image](../assets/image/shift.jpg)

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

2. handleCheck fn。

   建立了一個區域變數 let inBetween = false 來當作選取區間的標記，
   並在每次觸發時檢查是否”有按著 shift 點擊”if(e.shiftKey && this.checked)，
   若有的話則再跑一次 forEach 來透過 inBetween 對每個 checkbox 進行區間標記，
   把屬於區間內的 checkbox 勾起來，並記錄此次點擊的位置。

   ```javascript
   let lastChecked;

   function handleCheck(e) {
     let inBetween = false;
     // 檢查是否按著 shift 鍵 && 元素是否被checked。
     if (e.shiftKey && this.checked) {
       // 迭代每一個checkbox。
       checkboxes.forEach((checkbox) => {
         // 當前點選的checkbox開始記錄到最後一個點選的checkbox關閉標記
         if (checkbox === this || checkbox === lastChecked) {
           inBetween = !inBetween;
         }
         // 勾選區間內為true的checkbox
         if (inBetween) {
           checkbox.checked = true;
         }
       });
     }
     lastChecked = this;
   }
   ```
