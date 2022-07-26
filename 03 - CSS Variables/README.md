# 用 JavaScript 更新 CSS 變數

### 學習內容

- 設置 CSS 變數
- 根元素選取
- NodeList 迭代(iteration)

### 筆記

使用 :root 儲存 CSS 變數，prefix 使用--(CSS 規定)。
(eg. --變數名稱

```CSS
:root {
    --base: #f7df1e;
}
```

document.documentElement 選取根元素。

```JavaScript
document.documentElement.style
```

Node list 迭代

```JavaScript
// input node list(內含所有選取input的類陣列)
// forEach迭代每個元素
inputs.forEach((input) => {
    // 對每個元素進行操作
    input.addEventListener('change', handleUpdate);
});
```
