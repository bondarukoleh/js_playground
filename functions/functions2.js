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

new Class().checkThis()