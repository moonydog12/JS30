'use strict';
// 選取所有類別.controls下的inputs el
/* nodeList !== array ，兩者可用methods不同 */
const inputs = document.querySelectorAll('.controls input'); // inputs儲存input DOM的nodeList

function handleUpdate() {
  // dataset 物件格式，包含this指向元素的data標籤(自訂tag)
  const suffix = this.dataset.sizing || '';
  console.log(this.name);
  // 得到文件根元素(:root)的參照
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach((input) => {
  input.addEventListener('change', handleUpdate);
});
inputs.forEach((input) => {
  input.addEventListener('mousemove', handleUpdate);
});
