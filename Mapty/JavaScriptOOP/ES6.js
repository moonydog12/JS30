// 1.Class are not hoisted
// 2.Class are first-class citizen
// 3.Classes are executed in strict mode

class Person {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance method
  // Methods will be added to .prototype property
  calcAge() {
    console.log(new Date().getFullYear() - this.birthYear);
  }

  get age() {
    return new Date().getFullYear() - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    if (name.includes(' ')) {
      // Convention to avoid naming conflict
      this._fullName = name;
    } else {
      alert(`${name} is not a full name`);
    }
  }

  get fullName() {
    return this._fullName;
  }

  // Static method(not available on instances)
  static hey() {
    console.log('Hey there 🐛');
  }
}

Person.hey();
const jessica = new Person('Jessica Bale', 1996);
console.log(jessica);

// jessica.hey(); => throw an error! hey is a static method

jessica.calcAge();
console.log(jessica.age);

console.log(jessica.__proto__ === Person.prototype);

Person.prototype.greet = function () {
  console.log(`Hey ${this.firstName}`);
};

jessica.greet();

// Getter & Setter
const account = {
  owner: 'Jonas',
  movements: [200, 420, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);
account.latest = 12;

const walter = new Person('Walter Disney', 1965);
console.log(walter);
