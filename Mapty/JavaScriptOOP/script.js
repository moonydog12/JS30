'use strict';

// Constructor function
// 1) New {} is created
// 2) function is called, this = {}
// 3) {} linked to prototype
// 4) function automatically return {}

const Person = function (firstName, birthYear) {
  // Instance property
  this.firstName = firstName;
  this.birthYear = birthYear;

  // methods(bad practice,don't create method in constructor function, every instance of the object will receive these methods)
  // this.showSelf = () => {
  //   console.log(this);
  // };

  // this.calcAge = () => {
  //   console.log(new Date().getFullYear() - this.birthYear);
  // };
};

const near = new Person('Near', 1995);
const jack = new Person('Jack', 1988);

// Prototypes
Person.prototype.calcAge = function () {
  console.log(new Date().getFullYear() - this.birthYear);
};

near.calcAge();
console.log(near.__proto__);

// Check if the "near" is Person's prototype of linked objects
console.log(near.__proto__ === Person.prototype);

Person.prototype.species = 'Homo Sapiens';
console.log(near.species, jack.species);
console.log(near.hasOwnProperty('firstName'));

// this property is not inside of near object, near can access to it because it is its prototype
console.log(near.hasOwnProperty('species'));

// Object.prototype(top of prototype chain)
console.log(near.__proto__.__proto__);

//
console.dir(Person.prototype.constructor);

// Prototype of Array object
const arr = [1, 2, 3, 1, 2, 3, 1, 2, 3, 4, 4]; // [] === new Array
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

// Inheritance between "Classes":Constructor function
const Student = function (firstName, birthYear, course) {
  // Calls the function with a given "this"
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 1997, 'Computer Science');
mike.introduce();
mike.calcAge();
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);
