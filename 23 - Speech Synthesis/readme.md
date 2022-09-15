# SpeechSynthesis

## 大綱

使用 Web Speech API 中的 `SpeechSynthesis` 實作瀏覽器說話功能，另外透過 DOM 來操控語速、音高。

學習重點 :

- `SpeechSynthesisUtterance`、`SpeechSynthesis` api
- array method 組合 HTML 元素

## 筆記

### 步驟拆解:

1. 匯入API 

   ```javascript
   const msg = new SpeechSynthesisUtterance();
   // 輸入欄位文字成為SpeechSynthesisUtterance要使用的值
   msg.text = document.querySelector('[name="text"]').value;
   //  取得 SpeechSynthesis controller 的參照 (reference)
   const synth = window.speechSynthesis;
   ```

   

2. 設定語言選單

   ```javascript
   function populateVoices() {
     voices = this.getVoices();
     // 將所有語系塞進下拉選單中
     voicesDropdown.innerHTML = voices
       .filter((voice) => voice.lang.includes('zh') || voice.lang.includes('en'))
       .map(
         (voice) =>
           `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
       )
       .join(''); 
   }
   
   // 監聽語音清單變更後進行語系清單的更新
   speechSynthesis.addEventListener('voiceschanged', populateVoices);
   ```

3. 監聽rate 及 pitch 更動

   ```javascript
   function setOption() {
     msg[this.name] = this.value;
     toggle();
   }
   ```

   

4. 透過start 及 stop 按鈕開啟及結束

   ```javascript
   function toggle(startOver = true) {
     speechSynthesis.cancel();
     if (startOver) speechSynthesis.speak(msg);
   }
   ```

   ### JavaScript 補充

- 透過陣列方法來組成HTML

  ```javascript
  // 使用filter篩選出包含zh及en的語系
  array.filter((voice) => voice.lang.includes('zh') || voice.lang.includes('en'))
  // map把資料組成html格式
  .map((voice) => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
  // 最後用join合併陣列
  .join('';)
  ```



### 參考資料

> [MDN - SpeechSynthesisUtterance ](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance)
>
> [MDN - SpeechSynthesis ](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)

