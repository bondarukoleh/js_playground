class A {
  constructor() {
    this.property = 'value';
    if(new.target !== '[Function: A]') {
      console.log('This is not called directly');
    }
  }

  parentMethod() {
    console.log('parent method');
  }
}

// const a = A(); /* error, Class constructor A cannot be invoked without 'new' */

// • You cannot call class as function without new
// • classes don't hoist
// • cannot duplicate class name
// • constructor can be only regular function, not getter, or generator
// • You cannot call class constructor from prototype
// • Static methods are writable and configurable, but not enumerable.
// • Foo.prototype is non-writeable, non-enumerable, non-configurable.
// • Foo.prototype.constructor is non-writeable, non-enumerable, non-configurable.
// • Prototype methods Foo.prototype.* are writable and configurable, but not enumerable.


class B extends A {
  constructor() {
    super();
    // this.property = 'B';
  }

  bMethod(){
    super.parentMethod(); // we can call method from parent, super is aiming on prototype of [HomeObject], always,
    // even if you borrow it to some other chain of objects
    console.log(super.property); // there is no property in prototype object for now, only in child, because only methods goes
    // to prototype, properties - to object that is creating
  }

  // notMethodDefinition = function () {
  //   super.parentMethod(); // Sins it's not a method but function - it doesn't have the super access, no [HomeObject]
  // }
}

const parent = {
  // namedExp: function aaa(){
  //   super.someMethod() // same story here
  // }

  namedExp(){
    super.someMethod()
  }
}

const child = {
  someMethod(){
    console.log('Method');
  }
};

Object.setPrototypeOf(child, parent)
child.namedExp()
const b = new B();
// b.notMethodDefinition() // SyntaxError: 'super' keyword unexpected here
console.log(b.constructor.name);
b.bMethod();
