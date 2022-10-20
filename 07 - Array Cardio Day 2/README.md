# Array Cardio Day 2

![image](../assets/image/queue2.jpg)

## Abstract

學習新的 Array methods

## Content

- some( ) : 檢查陣列中是否至少有一元素符合函式條件，回傳布林值。

> 查詢陣列內是否有人成年

```javascript
const isAdultArrow = people.some((person) => new Date().getFullYear() - person.year >= 19);
```

- every( ) : 測試陣列中的所有元素是否都通過了函式條件。

> 查詢陣列內是否皆為成年。

```javascript
const isEveryAdult = people.every((person) => new Date().getFullYear() - person.year >= 19);
```

- find( ) : 類似 filter( )，但是 filter( )會回傳全部符合的項目，find( )則回傳單一項目。

> 找陣列 id 等於 823423，並回傳該元素。

```javascript
const matchedComment = comments.find((comment) => comment.id === 823423);
```

- find( ) : 查找符合函式條件元素的 index。

> 找陣列 id 等於 823423，並回傳 index

```javascript
let index = comments.findIndex((comment) => comment.id === 823423);
```

### 刪除陣列元素

- splice( ) : 刪除既有元素並／或加入新元素來改變一個陣列的內容。，第一個參數是要刪除的 index 起點, 第二個參數是要刪除的數量，第三個參數之後是要新加入的內容。

- slice(index, index)，第一個參數為起點，第二個參數為終點（不包含終點），若第二個參數不填預設為最後。回傳一個 array object。若是利用拆分的方式，掠過 index 不處理。可以達到 splice()的效果。

> 刪除該 index 元素。

```javascript
// splice( )
comments.splice(index, 1);

// slice()
const newComments = [...comments.slice(0, index), ...comments.slice(index + 1)];
```
