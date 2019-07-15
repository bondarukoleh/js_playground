function changeArgs(a, b) {
  console.log(`a: ${a}, b: ${b}, %j`, arguments)
  arguments[0] = 'new a value'
  console.log(`a: ${a}, b: ${b}, %j`, arguments)
}
// changeArgs('aValue', 'bValue')

const arrow = () => { console.log(this.value) }
const func = function () { console.log(this.value) }
const returnArrow = function () { return () => { console.log(this.value) } }

class Class {
  constructor() {
    this.value = 'value'
    this.innerCalled = arrow
  }
  checkThis() {
    arrow()
    func()
    this.innerCalled();
    (() => { console.log(this.value) })()
    returnArrow.bind(this)()()
  }
}

// new Class().checkThis()

function CheckThis () {
  this.whoIsIt = () => this;
}

const ob1 = new CheckThis() // here we set call context of function constructor
console.log(ob1.whoIsIt() === ob1); // true
const ob2 = {
  whoIsIt: ob1.whoIsIt // and arrow function will grab context from where it was created.
}
console.log(ob2.whoIsIt() === ob2); // false
const ob3 = new CheckThis()
console.log(ob3.whoIsIt() === ob3); // true