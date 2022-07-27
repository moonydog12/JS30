# Ajax Type Ahead

## Abstract

這次 Project 介紹 Fetch api 使用方式，使用 ajax (Asynchronous JavaScript and XML) 的方式來取資料，並依使用者輸入的不同即時顯示搜尋結果，使用到正規表示式來處理字串。

學習內容 :

- Fetch api
- RegExp object
- 樣板字面值

## Content

Fetch( ) :

提供了一個能獲取跨網路資源的 web api，回傳格式為[Promise](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Promise)。

[MDN doc](https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API)

> 用 fetch 取得資料

```JavaScript
fetch(endpoint) // 從endpoint變數儲存的網址拿取資料
  // blob是Response，要把它轉換成json格式
  .then((blob) => blob.json())
  /* 把取得的資料推入cities陣列，
     使用destructure operator */
  .then((data) => cities.push(...data));
```

RegExp( ) :

創造一個正規表示法的物件，用來比對符合自訂規則的文字。

g、i 參數分別表示 global , insensitive，表示比對字串不受大小寫影響

> 處理輸入特定文字後取得特定資料

```JavaScript
function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    // 確認city || state 符合搜尋字串
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
}
```

[MDN Doc](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

樣板字面值 :

比對字串後，需要把結果渲染到瀏覽器上，用 ' ' 或是 " " 來處理 HTML template 比較麻煩。使用樣板字面值 `` 更省時。傳遞的參數可以用 ${value}，帶入。

> 定義查找事件 displayMatches 的內容。

```JavaScript
function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, 'gi');
      const cityName = place.city.replace(
        regex,
        // 使用 template literal 輸出符合城市名稱結果
        `<span class="hl">${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        // 使用 template literal 輸出符合洲名稱結果
        `<span class="hl">${this.value}</span>`
      );
      return `
    <li>
      <span class="name">${cityName}, ${stateName}</span>
      <span class="population">${numberWithCommas(place.population)}</span>
    </li>
    `;
    })
    .join('');
  suggestions.innerHTML = html;
}
```

[MDN Doc](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Template_literals)
