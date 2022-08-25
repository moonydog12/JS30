// start with strings, numbers and booleans
let age = 100;
let age2 = age;
console.log(age, age2);
age = 200;
console.log(age, age2);

let myName = 'near';
let myName2 = myName;
console.log(myName, myName2);
myName = 'Luo';
console.log(myName, myName2);

// Let's say we have an array
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];

// and we want to make a copy of it.
const team = players; // team 會是原本 players array 的參照 (reference);不會是一個新的 array
console.log(team);
// team[3] = 'Cindy'; // update the reference array will also mutate the original one
console.log(team);
console.log(players);

// You might think we can just do something like this:

// however what happens when we update that array?

// now here is the problem!

// oh no - we have edited the original array too!

// Why? It's because that is an array reference, not an array copy. They both point to the same array!

// So, how do we fix this? We take a copy instead!
const team2 = players.slice(); // 做出一個新的array
const team3 = [].concat(players); // 另一種方式
team3[3] = 'Tutu'; // team3 => ['Wes','Sarah','Ryan','Tutu'],不汙染 players array
team2[3] = 'Bubu'; // team2 => ['Wes','Sarah','Ryan','Bubu'],不汙染 players array
// one way

// or create a new array and concat the old one in

// or use the new ES6 Spread
const team4 = [...players];
team4[3] = 'Coco';
console.log(team4);
const team5 = Array.from(players);
// now when we update it, the original one isn't changed

// The same thing goes for objects, let's say we have a person object

// with Objects
const person = {
  name: 'Wes Bos',
  age: 80,
};

// and think we make a copy:
// const captain = person; // captain 成為 person 物件的 reference
// captain.number = 12; // person 物件會被汙染
// how do we take a copy instead?
const cap2 = Object.assign({}, person, { number: 99, age: 27 }); // 全新物件，不汙染person物件
console.log(cap2);
// We will hopefully soon see the object ...spread
const cap3 = { ...person }; // shallow copy
// Things to note - this is only 1 level deep - both for Arrays and Objects. lodash has a cloneDeep method, but you should think twice before using it.
const near = {
  name: 'Near',
  age: 25,
  social: {
    married: false,
    rich: false,
  },
};
const dev = Object.assign({}, near); // 1 level clone
console.log(dev);
dev.social.rich = true;
console.log(near); // near 物件被汙染了
// 不推薦的deep clone作法
const dev2 = JSON.parse(JSON.stringify(near)); // 先把物件轉成字串格式，再轉回物件格式
dev2.social.married = true;

console.log(dev2);
console.log(near);
