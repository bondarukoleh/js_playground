const util = require('util')

function Animal(name){
  this.name = name;
}
Animal.prototype.printName = function(){
 console.log(this.name);
}

function Dog(name){
  Animal.call(this, name);
}

function Cat(name){
  Animal.call(this, name);
}

Dog.prototype = Object.create(Animal.prototype);
// right now Dog.prototype.constructor -> Animal, that's not right
console.log(Dog.prototype.constructor); //[Function: Animal]
Dog.prototype.constructor = Cat; // that's better
const dog = new Dog("Rex");
dog.printName();

util.inherits(Cat, Animal);
console.log(Cat.prototype.constructor); //{ [Function: Cat] super_: [Function: Animal] }
const cat = new Cat("Pussy");
cat.printName();

class A {
  constructor(){
    this.value = 1;
  }
  printValue(){
    console.log(this.value);
  }
}
class B extends A {}
console.log(B.prototype.constructor); //[Function: B]
const b = new B()
b.printValue()

