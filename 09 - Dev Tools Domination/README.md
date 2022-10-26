# Console Tricks !

![image](../assets/image/toolkits.jpg)

## Abstract

這次的 Project 介紹 devtool console 的其他用法。

## Content

### 輸出內容

- `console.log()` : 把輸入內容列印在 console 上。

  1. 把參數作為替代字串:

     ` console.log('Hello I am a %s string!', '💻');`

     會印出 Hello I am a 💻 string!

  2. 加入 CSS 樣式

     ` console.log('%cI am a bigger one.', 'font-size:30px');`

- `console.warn('Warn')` : 黃色輸出。
- `console.error('Error')` : 紅色輸出。
- `console.info('Info')` : 資訊符號。
- `console.table(dog)` : 把 array 用表格型式輸出。

### 其他使用方式

- `console.assert()` : 測試輸出。

  若第一參數為 `false`，則會輸出第二參數內容。

  ```JS
  // 輸出結果為 'false'
  console.assert( 1 === 2 , 'false');
  // 瀏覽器上不會有輸出，因為測試成功
  console.assert(1 === 1, 'false');
  ```

- `console.clear()` : 清除 console 畫面。

- `console.dir()` : 查看被選取的 dom 元素屬性

  ```js
  const p = document.querySelector('p');
  console.dir(p);
  ```

- `console.group()` : 群組資料。

  ```js
  dogs.forEach((dog) => {
    console.groupCollapsed(`${dog.name}`);
    console.log(`It is ${dog.name}`);
    console.log(`${dog.name} is ${dog.age} years old`);
    console.groupEnd();
  });
  ```

- `console.count()` : 計算參數出現次數。

  ```js
  console.count('dog'); // dog:1
  console.count('dog'); // dog:2
  console.count('dog'); // dog:3
  ```

- `console.time()` :

  計算 console.time 到 console.timeEnd 的執行時間。

  ```js
  console.time('fetching data');
  fetch('https://api.github.com/users/moonydog12')
    .then((data) => data.json())
    .then((data) => {
      console.timeEnd('fetching data');
      console.log(data);
    });
  ```
