class A {
  constructor() {
    this.property = 'value';
  }

  parentMethod() {
    console.log('parent method');
  }
}

// const a = A(); /* error, Class constructor A cannot be invoked without 'new' */

// • You cannot call class as function without new
// • classes don't hoist
// • cannot dublicate class name
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
    super.parentMethod(); // we can call method from parent
    console.log(super.property); // there is no property in prototype object for now, only in child, because only methods goes
    // to prototype, properties - to object that is creating
  }
}

const b = new B();
console.log(b.constructor.name);
b.bMethod();
