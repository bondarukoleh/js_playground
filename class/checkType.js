cl = console.log;
function showProperties(obj) {
  for (const p in obj) {
    cl(`Property: "${p}" is enumerable.`)
  }
}
function checkClassType() {
  class A {
    constructor() {
      this.aProp = 'A property';
    }
  }

  class B extends A {
    constructor() {
      super()
      this.bProp = 'B property';
    }
  }

  const b = new B();
  cl(`b instanceof B`, b instanceof B);
  cl(`b instanceof A`, b instanceof A);
  cl(`b.constructor === B`, b.constructor === B);
  cl(`b.constructor === A`, b.constructor === A);
  cl(`b.constructor`, b.constructor);
  cl(`B.prototype.__proto__.constructor`, B.prototype.__proto__.constructor);
  cl('aProp in b', 'aProp' in b)
  cl('b.hasOwnProperty aProp in b', b.hasOwnProperty('aProp'));
  cl('b.hasOwnProperty bProp in b', b.hasOwnProperty('bProp'));
  const a = new B.prototype.__proto__.constructor();
  cl(`a instanceof A created from __proto__.constructor`, a instanceof A);
}
// checkClassType()

function checkFunctionType() {
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
  B.prototype = Object.create(A.prototype, {constructor: { configurable: true, enumerable: false, value: B }});
  B.prototype.bMethod = () => cl('B method');
  showProperties(B.prototype)
  // B.prototype.__proto__ = A.prototype //cheat, but the same result
  const b = new B();
  cl('b instanceof B', b instanceof B);
  cl('b instanceof A', b instanceof A);
  cl('b constr = B', b.constructor === B);
  cl('b constr = A', b.constructor === A);
  cl('b constr', b.constructor);
  cl('b prototype proto construct', B.prototype.__proto__.constructor);
  cl('aProp in b', 'aProp' in b)
  cl('aProp ownProperty in b', b.hasOwnProperty('aProp'));
  cl('bProp ownProperty in b', b.hasOwnProperty('bProp'));
  const a = new B.prototype.__proto__.constructor();
  cl('a instanceof A', a instanceof A);
}
// checkFunctionType()