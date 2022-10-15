# Whack A Mole 🐬

## Abstract

做一個打地鼠遊戲。在固定時間內紀錄玩家分數，並有重新遊戲的功能。

## Steps

1.  選取元素、設定 global variables。

    ```javascript
    // get elements on the page
    const waves = gameBoard.querySelectorAll('.wave');
    const dolphins = gameBoard.querySelectorAll('.dolphin');
    const startButton = document.querySelector('.startBtn');

    // 設定全域變數
    let lastWave; // 最後出現的地鼠洞
    let timeUp = false; // a boolean flag to check if the game is over
    let score = 0;
    ```

2.  實作輔助功能

    - 設定地鼠出現時間
      ```js
      // 傳入最小&最大值，回傳一個區間亂數
      function randomTime(min, max) {
        return Math.round(Math.random() * (max - min) + min);
      }
      ```
    - 設定地鼠出現洞穴

      ```js
      function getRandomWave() {
        // 取得地鼠洞數量區間內隨機一個洞
        const idx = Math.floor(Math.random() * waves.length);
        const wave = waves[idx];
        // 遞迴(recursion)
        if (wave === lastWave) {
          // 如果產生的地鼠洞和上次的相同，重新產生新的地鼠洞
          return getRandomWave();
        }
        lastWave = wave;
        return wave;
      }
      ```

3.  實作主要功能

    - 地鼠出現動畫
      ```js
      function jump() {
        // 計算地鼠跑出來到縮回去的時間(隨機取得)
        const time = randomTime(200, 1000);
        // 取得地鼠出現的洞
        const wave = getRandomWave();
        // 增加出現的動畫class
        wave.classList.add('up');
        setTimeout(() => {
          wave.classList.remove('up');
          if (!timeUp) {
            jump();
          }
        }, time);
      }
      ```
    - 敲擊地鼠

      ```js
      function bonk(e) {
        // 確認玩家沒有作弊
        if (!e.isTrusted) return;
        // 打到就移除出現的動畫
        this.classList.remove('up');
        score++;
        // 更新顯示分數
        scoreBoard.textContent = score;
      }
      ```

4.  設定開始遊戲按鈕&功能

    ```js
    function startGame() {
      startButton.style.display = 'none';
      timeUp = false; // 重置時間
      // 重置分數
      score = 0;
      scoreBoard.textContent = score;
      jump();

      // 設定十秒後把遊戲設為結束
      setTimeout(() => {
        timeUp = true;
        startButton.style.display = 'block';
      }, 10000);
    }
    ```

## Content

**Event.isTrusted :**

Event interface 的唯獨屬性，用來確認使用者是否使用腳本或者行為目標(event target)是否使用 [dispatch() ](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent) method。

```js
if (e.isTrusted) {
  /* The event is trusted */
} else {
  /* The event is not trusted */
}
```

**Recursion :**

function 呼叫自己

```js
const factorial = (n) => {
  if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
};
console.log(factorial(10));
// 3628800
```

## Summary

這個範例中使用了遞迴這個進階的 Js 函式用法，遞迴是所有進階演算法的入門磚，所以要找機會熟悉這個概念。

> 參閱 :
>
> [Recursion - javascript.info](https://javascript.info/recursion)
