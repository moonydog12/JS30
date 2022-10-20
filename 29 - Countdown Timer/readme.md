# Countdown timer

![image](../assets/image/countdownTimer.jpg)

## Abstract

利用 JavaScript setInterval() 實作倒數計時功能 ，也能透過表單輸入客製化的時間。

## Content

### 步驟拆解

1. 選取元素
2. 實作計時器效果
3. 為每個按鈕的新增行為監聽
4. 監聽表單輸入時間

### JavaScript

**計時器效果:**

```javascript
// 全域變數，儲存當前計時器
let countdown;

// 計時器功能
function timer(seconds) {
  // 新的計時器啟動前，先清除現有的計時器
  clearInterval(countdown);
  // 儲存目前時間以及計算結束時間
  let now = Date.now();
  let then = now + seconds * 1000;
  // UI render functions
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    // 計算總時長
    let secondsLeft = Math.round((then - Date.now()) / 1000);
    // 如果時間小於 0 (計時結束)，中止 Interval
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // 更新UI
    displayTimeLeft(secondsLeft);
  }, 1000);
}

/* UI render*/
// 顯示倒數時間
function displayTimeLeft(seconds) {
  // 計算分鐘數、秒數
  let minutes = Math.floor(seconds / 60);
  let remainderSeconds = seconds % 60;
  // 秒數的部分小於0；在數字前面補上0
  let display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  // UI 顯示對應時間
  timerDisplay.textContent = display;
  document.title = display;
}

// 顯示計時結束後的時間
function displayEndTime(timestamp) {
  let end = new Date(timestamp);
  let hour = end.getHours();
  let minutes = end.getMinutes();
  endTime.textContent = `Be back at ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}
```

**監聽按鈕行為:**

```javascript
// 選取每個有 [data-time] 屬性的元素，這裡會選到按鈕
const buttons = document.querySelectorAll('[data-time]');

function startTimer() {
  // 計算 html中設定的 data-time（秒數）
  let seconds = parseInt(this.dataset.time);
  // 把秒數傳入計時器
  timer(seconds);
}
```

**監聽表單提交行為:**

```js
document.customForm.addEventListener('submit', function (e) {
  // 因為用form，submit後避免跳頁使用preventDefault()來阻止預設事件
  e.preventDefault();
  // 取得input欄位的值
  const mins = this.minutes.value;
  // 傳入計時器
  timer(mins * 60);
  // 清空input
  this.reset();
});
```

可以使用 name attribute 名稱來選擇帶有該 name 屬性的元素，所以 `document.customForm`、`document.querySelector('#custom')`都會選到同樣的表單。

## Summary

這個 project 有許多細節需要注意，`setInterval`設定定時功能，`clearInterval` 取消定時功能，因為把 `setInterval`存在變數內，所以清除時把變數作為參數帶入 `clearInterval` 變得很方便。

> [setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/setInterval)
>
> [clearInterval()](https://developer.mozilla.org/en-US/docs/Web/API/clearInterval)
>
> [event.preventDefault](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
