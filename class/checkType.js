const cl = console.log

function checkInheritance({childInstance, childClass, parentClass}) {
  cl(`childInstance instanceof childClass "${childInstance instanceof childClass}"`)
  cl(`childInstance instanceof parentClass "${childInstance instanceof parentClass}"`)
  cl(`childInstance.constructor === childClass "${childInstance.constructor === childClass}"`)
  cl(`childInstance.constructor.name "${childInstance.constructor.name}"`)
  cl(`childInstance.constructor === parentClass "${childInstance.constructor === parentClass}"`)
  cl(`childClass.prototype.__proto__.constructor.name "${childClass.prototype.__proto__.constructor.name}"`)
  showProperties(childInstance)
  const newChild = new childClass.prototype.__proto__.constructor()
  cl(`New instance of parentClass created from childInstance.__proto__.constructor "${newChild instanceof parentClass}"`)
}

const showProperties = (obj) => {
  for (const p in obj) {
    cl(`Property: "${p}" is enumerable.`)
  }
}
const checkClassType = () => {
  class A {
    constructor() {
      this.aProp = 'A property'
    }
  }

  class B extends A {
    constructor() {
      super()
      this.bProp = 'B property'
    }
  }

  const b = new B()
  checkInheritance({childInstance: b, childClass: B, parentClass: A})
}
// checkClassType()

const checkFunctionInheritance = () => {
  function A() {
    this.aProp = 'aProp'
  }

  A.prototype.aMethod = () => cl('A method')

  function B() {
    A.call(this)
    this.bProp = 'bProp'
  }

  //B.prototype.constructor = B; value will be enumerable, which is wrong
  // Object.defineProperty(B.prototype, 'constructor', { configurable: true, enumerable: false, value: B }) - we can do 
  // this way, but why if we have ability to 
  B.prototype = Object.create(A.prototype, {constructor: {configurable: true, enumerable: false, value: B}})
  B.prototype.bMethod = () => cl('B method')
  // B.prototype.__proto__ = A.prototype //cheat, but the same result. And __proto__ isn't enumerable
  const b = new B()
  checkInheritance({childInstance: b, childClass: B, parentClass: A})
}
// checkFunctionType()

const checkInheritanceWithNew = () => {
  function A() {
  }

  A.prototype.aMethod = () => cl('A method')

  function B() {
  } // Pay attention when we use new in prototype, we don't need to .call(this) to parent class
  B.prototype = new A()
  Object.defineProperty(B.prototype, 'constructor', {enumerable: false, configurable: true, value: B})
  B.prototype.bMethod = () => cl('B method')
  const b = new B()
  checkInheritance({childInstance: b, childClass: B, parentClass: A})
}

// checkFunctionInheritance()

function setPrototypeOfCheck() {
  function A() {
  }

  A.prototype.aMethod = () => cl('A method')

  function B() {
    A.call(this)
  }

  Object.setPrototypeOf(B.prototype, A.prototype)
  B.prototype.bMethod = () => cl('B method')
  const b = new B()
  checkInheritance({childInstance: b, childClass: B, parentClass: A})
}

// setPrototypeOfCheck()

//a instanceof A The instanceof operator works by checking whether the current prototype of the
// A function is in the prototype chain of the a instance.
const checkInstanceof = () => {
  function A() {
  }

  const a = new A()
  a.__proto__ = {}
  cl(a instanceof A) // false, because A.prototype isn't in prototype chain of a

  function B() {
  }

  const b = new B()
  B.prototype = {}
  cl(b instanceof B)// false, because B.prototype isn't in prototype chain of a 
}
// checkInstanceof()