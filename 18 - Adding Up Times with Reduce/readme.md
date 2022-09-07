# Tally String Times with Reduce

## 大綱

練習使用 array method 來加總時間。

## 筆記

### JavaScript

#### **NodeList 轉換成 Array**

專案中可能會遇到需要計算影片總長度，這個專案把影片長度寫死在自訂的HTML `data` attribute，現實可能會使用 JS 去選擇元素裡面的字串。

抓取 HTML attribute 裡面的字串 (方法二擇一) :

`document.querySelectorAll` 選擇出來的元素會以 node list 格式回傳，node list 不是 array，所以要把它轉成 array 才能使用 array methods。

```javascript
// ES6 Spred operator
const timeNodes = [...document.querySelectorAll('[data-time]')];
// Array.from 建立 Array 實體
const timeNodes = Array.from(document.querySelectorAll('[data-time]'));
```

#### **Array destructuring**

不使用解構 :

array.split 之後，格式還是 string，所以要轉成數字。 

```javascript
let minutes = parseFloat(timeCode.split(':')[0]);
let seconds = parseFloat(timeCode.split(':')[1]);
```

ES6 的解構賦值 :

```javascript
let [minutes, seconds] = timeCode.split(':').map(parseFloat);
```

#### **Array.prototype.reduce**

將一個累加器及陣列中每項元素（由左至右）傳入回呼函式，並將陣列化為單一值。

```javascript
const seconds = timeNodes
  .map((node) => node.dataset.time)
  .map((timeCode) => {
    let [minutes, seconds] = timeCode.split(':').map(parseFloat);
    return minutes * 60 + seconds;
  })
   // 累加陣列中所有秒數
  .reduce((total, vidSeconds) => total + vidSeconds);
```



> 參閱 [MDN - Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

### HTML

#### 自訂 data attribute

```html
<ul class="videos">
      <li data-time="52:40">Video 1</li>
</ul>
```

使用 `Element.dataset.<attribute>` 可以把 data-time 的值取出來。

```javascript
let li = document.querySelector('li');
console.log(li.dataset.time); // "52:40"
```



