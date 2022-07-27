# Array Cardio Day 1

## Abstract

Array methods

- filter
- map
- sort
- reduce

## Content

### filter( ) :

filter() 方法會建立一個經指定之函式運算後，由原陣列中通過該函式檢驗之元素所構成的新陣列。

```javascript
const bornInFifteenArrow = inventors.filter(
  // 保留符合條件的inventor
  (inventor) => inventor.year > 1499 && inventor.year < 1600
);
console.table(bornInFifteenArrow);
```

> Tip: console.table 比 console.log 適合在瀏覽器呈現表格資料

[MDN doc( filter 方法 )](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

### map( ) :

map() 方法會建立一個新的陣列，其內容為原陣列的每一個元素經由回呼函式運算後所回傳的結果之集合。

```javascript
const fullNames = inventors.map(
  (inventor) => `${inventor.first} ${inventor.last}`
);
```

[MDN doc( map 方法 )](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

### sort( ):

sort() 方法會原地（in place）對一個陣列的所有元素進行排序，並回傳此陣列。排序不一定是穩定的（stable）。預設的排序順序是根據字串的 Unicode 編碼位置（code points）而定。

由於依賴執行環境的實作，所以並不能保證排序的時間及空間複雜度。

```javascript
const ordered = inventors.sort(function (a, b) {
  if (a.year > b.year) {
    return 1;
  } else {
    return -1;
  }
});

const orderedTernary = inventors.sort((a, b) => (a.year > b.year ? 1 : -1));
```

> Tips: JS Ternary operator 簡化語法

[MDN doc( sort 方法 )](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

### reduce( ):

reduce() 方法將一個累加器及陣列中每項元素（由左至右）傳入回呼函式，將陣列化為單一值。

```javascript
years === totalYears;
let years = 0;
for (let i = 0; i < inventors.length; i++) {
  let inventorLive = inventors[i].passed - inventors[i].year;
  years += inventorLive;
}

const totalYears = inventors.reduce((total, inventor) => {
  return total + (inventor.passed - inventor.year);
}, 0);
```

[MDN doc( reduce 方法 )](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
