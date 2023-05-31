// Get your shorts on - this is an array workout!
// ## Array Cardio Day 1

// Some data we can work with

const inventors = [
  { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
  { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
  { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
  { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
  { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
  { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
  { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
  { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
  { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
  { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
  { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
  { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 },
];

const people = [
  'Bernhard, Sandra',
  'Bethea, Erin',
  'Becker, Carl',
  'Bentsen, Lloyd',
  'Beckett, Samuel',
  'Blake, William',
  'Berger, Ric',
  'Beddoes, Mick',
  'Beethoven, Ludwig',
  'Belloc, Hilaire',
  'Begin, Menachem',
  'Bellow, Saul',
  'Benchley, Robert',
  'Blair, Robert',
  'Benenson, Peter',
  'Benjamin, Walter',
  'Berlin, Irving',
  'Benn, Tony',
  'Benson, Leana',
  'Bent, Silas',
  'Berle, Milton',
  'Berry, Halle',
  'Biko, Steve',
  'Beck, Glenn',
  'Bergman, Ingmar',
  'Black, Elk',
  'Berio, Luciano',
  'Berne, Eric',
  'Berra, Yogi',
  'Berry, Wendell',
  'Bevan, Aneurin',
  'Ben-Gurion, David',
  'Bevel, Ken',
  'Biden, Joseph',
  'Bennington, Chester',
  'Bierce, Ambrose',
  'Billings, Josh',
  'Birrell, Augustine',
  'Blair, Tony',
  'Beecher, Henry',
  'Biondo, Frank',
];

const data = [
  'f-18',
  'car',
  'car',
  'truck',
  'truck',
  'bike',
  'walk',
  'f-18',
  'car',
  'van',
  'bike',
  'walk',
  'car',
  'van',
  'car',
  'truck',
  'f-18',
];

// Array.prototype.filter()
// 1. Filter the list of inventors for those who were born in the 1500's
// 箭頭函式寫法
const bornInFifteenArrow = inventors.filter(
  (inventor) => inventor.year > 1499 && inventor.year < 1600,
);
const bornInFifteen = inventors.filter(function (inventor) {
  return inventor.year > 1499 && inventor.year < 1600;
});

// Array.prototype.map()
// take an array and do sth with that array and return a new array
// 接收一個陣列作為參數，操作陣列之後回傳一個新的陣列
// 2. Give us an array of the inventors first and last names
const fullNames = inventors.map((inventor) => `${inventor.first} ${inventor.last}`);

// Array.prototype.sort()
// 3. Sort the inventors by birthdate, oldest to youngest
const orderedList = inventors.sort((a, b) => (a.year > b.year ? 1 : -1));

// Array.prototype.reduce()
// 4. How many years did all the inventors live all together?

// 用迴圈來寫 :
let years = 0;
for (let i = 0; i < inventors.length; i++) {
  let inventorLive = inventors[i].passed - inventors[i].year;
  years += inventorLive;
}
const totalYears = inventors.reduce((total, inventor) => {
  return total + (inventor.passed - inventor.year);
}, 0);

console.log(years === totalYears); // 計算結果相同
// 5. Sort the inventors by years lived
const oldest = inventors.sort(function (a, b) {
  let lastGuy = a.passed - a.year;
  let nextGuy = b.passed - b.year;
  return lastGuy > nextGuy ? -1 : 1;
});
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
  return obj;
}, {});
