// Array.prototype.filter()
// 1. Filter the list of inventors for those who were born in the 1500's
// 箭頭函式寫法
const bornInFifteenArrow = inventors.filter(
  (inventor) => inventor.year > 1499 && inventor.year < 1600
);
const bornInFifteen = inventors.filter(function (inventor) {
  if (inventor.year > 1499 && inventor.year < 1600) {
    return true; // 保留符合條件的inventor
  }
});
// Array.prototype.map()
// take an array and do sth with that array and return a new array
// 接收一個陣列作為參數，操作陣列之後回傳一個新的陣列
// 2. Give us an array of the inventors first and last names
const fullNames = inventors.map(
  (inventor) => `${inventor.first} ${inventor.last}`
);
// Array.prototype.sort()
// 3. Sort the inventors by birthdate, oldest to youngest
// const ordered = inventors.sort(function (a, b) {
//   if (a.year > b.year) {
//     return 1;
//   } else {
//     return -1;
//   }
// });
const ordered = inventors.sort((a, b) => (a.year > b.year ? 1 : -1));
console.table(ordered);
// Array.prototype.reduce()
// 4. How many years did all the inventors live all together?
let years = 0;
for (let i = 0; i < inventors.length; i++) {
  let inventorLive = inventors[i].passed - inventors[i].year;
  years += inventorLive;
}
const totalYears = inventors.reduce((total, inventor) => {
  return total + (inventor.passed - inventor.year);
}, 0);

// 5. Sort the inventors by years lived
const oldest = inventors.sort(function (a, b) {
  let lastGuy = a.passed - a.year;
  let nextGuy = b.passed - b.year;
  return lastGuy > nextGuy ? -1 : 1;
});
console.table(oldest);
// 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
// const category = document.querySelector('.mw-category');
// const links = Array.from(category.querySelectorAll('a'));
// const de = links
//   .map((link) => link.textContent)
//   .filter((streetName) => streetName.includes('de'));
// 7. sort Exercise
// Sort the people alphabetically by last name
const test = [];
const alpha = people.sort((lastOne, nextOne) => {
  const [aLast, aFirst] = lastOne.split(', ');
  const [bLast, bFirst] = nextOne.split(', ');
  return aLast > bLast ? 1 : -1;
});
// 8. Reduce Exercise
// Sum up the instances of each of these
const transportation = data.reduce(function (obj, item) {
  if (!obj[item]) {
    obj[item] = 0;
  }
  obj[item]++;
  console.log(obj);
  return obj;
}, {});
console.log(transportation);
