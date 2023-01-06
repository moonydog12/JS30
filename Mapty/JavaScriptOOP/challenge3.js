const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

// 1) Use a constructor function to implement an electric car
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

// 2) Implement an "chargeBattery" method
// Linking prototypes
// Create an new object by Car's prototype and assign it to EV's prototype
EV.prototype = Object.create(Car.prototype);
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
const tesla = new EV('Tesla', 120, 23);
tesla.chargeBattery(90);
console.log(tesla);

// 3) Implement an "accelerate" method
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(`${this.make} is going at ${this.speed} km/h with ${this.charge}% power`);
};

// first accelerate method in the prototype chain will be used
// Child class methods could override Parent class methods
tesla.accelerate();
// 4)
