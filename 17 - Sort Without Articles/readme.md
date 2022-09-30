# Sort Without Articles

## 大綱

這次的 project 複習一些之前學過的 array methods，以及使用正規表示法篩選字元。

## 筆記

### JavaScript

#### **sort 排序**

陣列排序可以使用 `Array.prototype.sort(callback<a, b>)`。

sort 方法排序陣列內的元素，回傳相同陣列的參照(reference)。(mutat original array)

```javascript
let numbers = [1, 3, 4, 2];
numbers.sort();
// numbers 的順序被改變了
console.log(numbers); // => [1,2,3,4]
```

讓陣列按照字母排序 :

```javascript
// 比較每一個字串，順序高的在前面
const sortedBands = bands.sort((a, b) => (strip(a) > strip(b) ? 1 : -1));
```

> 參閱 [MDN - Array.prototype.sort() ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

#### **正規表示法**

```javascript
function strip(str) {
  /* 排序時忽略掉 a ,the , an 字元
   ** 參數 i (insensitive) 表示大小寫都會被檢查到
   */
  let regex = new RegExp('^(a |the |an )', 'i');
  return str.replace(regex, '').trim();
}
```
