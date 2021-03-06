const util = require('util');

/*
We can provide inheritance via:
1st - class/extend
2nd - Parent.call(this) & Object.create(Parent.prototype, {constructor: {enumerable: false, ...}})
3rd - Child.prototype = new Parent() & .defineProperty(Child.prototype, 'constructor', {enumerable: false, ...})
4th - Parent.call(this) & .setPrototypeOf(Child.prototype, Parent.prototype) 
5th - util.inherits(ChildClass, ParentClass)
6th - Child.prototype.__proto__ = Parent.prototype
*/

function Animal(name) {
  this.name = name;
}

Animal.prototype.printName = function () {
  console.log(this.name);
};

function Dog(name) {
  Animal.call(this, name);
}

Dog.prototype = Object.create(Animal.prototype);
// right now Dog.prototype.constructor -> Animal, that's not right
console.log(Dog.prototype.constructor); //[Function: Animal]
// Dog.prototype.constructor = Dog; // that's better
Dog.prototype = Object.create(Animal.prototype, {constructor: {configurable: true, enumerable: false, value: Dog}});
console.log(Dog.prototype.constructor); //[Function: Dog]
Dog.prototype.dogMethod = function () {
  console.log('Dog method called');
};
const dog = new Dog('Rex');
dog.printName();
dog.dogMethod();

function Cat(name) {
  Animal.call(this, name);
}

util.inherits(Cat, Animal);
console.log(Cat.prototype.constructor); //{ [Function: Cat] super_: [Function: Animal] }
Cat.prototype.catMethod = function () {
  console.log('Cat method called');
};
const cat = new Cat('Pussy');
cat.printName();
cat.catMethod();

function Rat(name) {
  Animal.call(this, name);
}

Rat.prototype.__proto__ = Animal.prototype;
console.log(Rat.prototype.constructor); // [Function Rat]
console.log(Rat.prototype.__proto__.constructor); // [Function Animal]
const rat = new Rat('Rat, ke ke ke');
rat.printName();

class A {
  constructor() {
    this.value = 1;
  }

  printValue() {
    console.log(this.value);
  }
}

class B extends A {
}

console.log(B.prototype.constructor); //[Function: B]
const b = new B();
b.printValue();

