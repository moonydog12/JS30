# Click and Drag

![image](../assets/image/scroll.jpg)

## Abstract

製作一個可以使用滑鼠水平拖曳的卷軸效果。

## Content

### 步驟拆解

1. **選取元素、設定初始變數**

   ```javascript
   const itemsBlock = document.querySelector('.items');
   const items = document.querySelectorAll('.item');
   // 用來判斷是否按住滑鼠的布林變數
   let isDown = false;
   // 紀錄起始位置
   let startX;
   // 紀錄移動距離
   let scrollLeft;
   ```

1. **綁定元素及監聽事件**

   ```javascript
   // 按下滑鼠
   itemsBlock.addEventListener('mousedown', (e) => {
     // do something
   });

   // 滑鼠離開元素
   itemsBlock.addEventListener('mouseleave', () => {
     // do something
   });

   // 放開滑鼠
   itemsBlock.addEventListener('mouseup', () => {
     // do something
   });
   // 滑鼠移動
   itemsBlock.addEventListener('mousemove', (e) => {
     // do something
   });
   ```

1. **實作事件觸發的 function 功能**

   按下滑鼠事件:

   ```javascript
   itemsBlock.addEventListener('mousedown', (e) => {
     // 設定滑鼠目前狀態為按下
     isDown = true;
     itemsBlock.classList.add('active');
     // 設定起始位置為目前頁面距離-當前item左邊距
     startX = e.pageX - itemsBlock.offsetLeft;
     // 設定目前捲軸的左距
     scrollLeft = itemsBlock.scrollLeft;
   });
   ```

   滑鼠移出事件:

   ```javascript
   itemsBlock.addEventListener('mousedown', (e) => {
     // 滑鼠目前狀態是放開(沒有按住)
     isDown = false;
     // 移除背景效果
     itemsBlock.classList.remove('active');
   });
   ```

   放開滑鼠按鍵事件:

   跟移出事件一樣

   ```javascript
   itemsBlock.addEventListener('mouseup', () => {
     isDown = false;
     itemsBlock.classList.remove('active');
   });
   ```

   滑鼠移動事件:

   這個 project 最重要的概念，必須要熟悉如何取得元素與行為(event) 的資訊，並思考如何應用才能完成。

   ```javascript
   itemsBlock.addEventListener('mousemove', (e) => {
     // 如果滑鼠狀態是沒有按住的，回傳(不執行)
     if (!isDown) return;
     // 避免觸發其他預設事件（按下且移動預設是選取範圍）
     e.preventDefault();
     // 設定變數 x（當前定位）為目前頁面距離-當前item左邊距
     let x = e.pageX - itemsBlock.offsetLeft;
     // 設定移動距離為 x-初始位置
     let walk = x - startX;
     // 設定水平捲軸的偏移距離
     itemsBlock.scrollLeft = scrollLeft - walk;
   });
   ```

### JavaScript 筆記

為了減少 HTML 重複出現的元素程式碼，我使用 JavaScript 來動態產生 HTML 元素，順便練習透過 JS 新增 DOM 元素。

感覺在學習前端框架的時候，這類型的 DOM 操作會被框架語法給取代，不過多寫一點 JS 還是挺有趣的。

```javascript
// 動態生成 html 元素
for (let i = 1; i <= 25; i++) {
  let div = document.createElement('div');
  div.setAttribute('class', `item item${i}`);
  div.textContent = i;
  itemsBlock.append(div);
}
```

## Summary

雖然有許多 JS 函式庫(library)提供比自己手刻更棒的效果，但是唯有自己親手嘗試，才會知道類似的效果是如何實踐的，在之後使用函式庫才知道要如何去調整。另外 pageX 是 MouseEvent interface 提供的資訊，和其他 Web API 回傳的資料不同。

參考資料:

> [MDN-MouseEvent.pageX](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageX)
