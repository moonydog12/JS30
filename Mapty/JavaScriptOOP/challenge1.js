// 1) Use a constructor function to implement a Car
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

// Prototypal inheritance
// 2) Implement an 'accelerate' method
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

// 3) Implement a 'brake' method
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

// 4) Create 2 car objects

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

mercedes.accelerate();
mercedes.brake();
bmw.accelerate();
bmw.accelerate();
