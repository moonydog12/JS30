# 01 - JavaScript Drum Kit

## Abstract

透過 JavaScript 使鍵盤按下後播放出對應按鍵的聲音，並同時產生一個特效。

按下其他按鍵，會關閉前一個按鍵的特效。

## Contents

### Steps

1. 新增 keydown event listener

   ```javascript
   window.addEventListener('keydown', playSound);
   ```

2. 建立 function `playSound`

   1. e.keyCode 來取得對應的`audio`標籤及該按鍵的`div`標籤

   2. 判斷傳入的 e.keyCode 是否有對應的`audio`標籤，若無則中斷執行

   3. 使對應的`div`加上`playing`樣式，產生對應的特效

   4. 使對應的`audio`播放時間為 0

   5. 播放對應的音檔

   ```javascript
   function playSound(e) {
     const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
     const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
     if (!audio) return; // 如果沒有該元素，停止執行function
     audio.currentTime = 0; //讓每次按下按鍵，音效都重新計時
     audio.play();
     key.classList.toggle('playing');
   }
   ```

3. 新增 transitionend listener

   1. 偵測所有包含`className='key'`的元件

   2. 當該元件觸發特效並結束時(`transitionend`)，呼叫`removeTransition`

   ```javascript
   keys.forEach((key) =>
     // 監聽每一個按鍵 transition 動畫結束，當動畫結束，執行removeTransition
     key.addEventListener('transitionend', removeTransition)
   );
   ```

4. 建立 function `removeTransition`

   1. 判斷傳入的 propretyName 是否為 transform，若否則退出
   2. 若為 transform，則移除`playing`樣式

   ```javascript
   function removeTransition(e) {
     if (e.propertyName !== 'transform') return; // 如果 propertyName 不是 transform 行為，略過它
     this.classList.remove('playing'); // this 指向呼叫該行為的元素
   }
   ```

### JavaScript 補充

- **element.classList**

  這個屬性回傳 element 的 class 值(陣列)，範例用到了 classList 的方法`add()`及`remove()`。如果已經存在/不存在的 className 則會被忽略。

  ```javascript
  classList.add('aaa', 'bbb', 'ccc'); //新增多個className
  classList.remove('aaa', 'bbb', 'ccc'); //移除多個className
  ```

  > 參閱：[MDN-Element.classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)

- **HTMLmediaElement(audio)**

  HTML 的`audio`標籤，在 HTML 放置如下標籤指定音源

  ```html
  <audio src="sound/a.mp3"></audio>
  ```

  > 參閱：[MDN-HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)

- **Array.from**

  範例中這段

  ```javascript
  const keys = Array.from(document.querySelectorAll('.key'));
  ```

  將一個物件或是字串轉為陣列格式的語法，querySelectorAll 選擇元素回傳的格式是 nodeList，nodeList 和 array 是不同的，nodeList 不能使用 array 內建的 method。使用 Array.form 轉換 nodeList 讓他可以使用 array methods。

  ```javascript
  let testNodeList = document.querySelectAll('.key');
  testNodeList.push('add'); // <--非陣列會報錯TypeError: testNodeList.push is not a function

  let testArray = Array.from(testNodeList);
  testArray.push('add'); // <-- 轉為陣列就可以了
  ```

  > 參閱：[MDN-NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)
