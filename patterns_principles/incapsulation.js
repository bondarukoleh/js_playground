const symbolPrivateValue = Symbol('somePrivateValue');
let closurePrivateValue = 'Never gonna get it';
const closurePrivateMethod = (value) => {/* do some private stuff with value */
};

class A {
  constructor() {
    this[symbolPrivateValue] = 'Not so private, but hard to get';
  }

  get superPrivate() {
    // some super check 
    return closurePrivateValue;
  }

  set superPrivate(newValue) {
    // some super check 
    closurePrivateValue = newValue;
  }

  doSomeStuff(value) {
    return closurePrivateMethod(value);
  }
}

const a = new A();
Object.keys(a).forEach(console.log); // nothing
console.log(a.superPrivate); // via getter with check
Object.getOwnPropertySymbols(a).forEach((value) => {
  console.log(a[value]); // gotcha
});