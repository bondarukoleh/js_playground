// let, const never hoist
const trickWithObjectAsAKey = _ => {
  const a = {};
  const b = {key: 'b'};
  const c = {key: 'c'};
  a[b] = 123; /* Property in object - is a string, so when we do a[b] b.toString() called -> "[object Object]",
               same as c, so a - has only one property "[object Object]"*/
  a[c] = 456;
  console.log(a[b]); // 456
};
// trickWithObjectAsAKey();

const closure = _ => {
  const hero = {
    _name: 'John Doe',
    getSecretIdentity: function () {
      return this._name;
    }
  };

  const stoleSecretIdentity = hero.getSecretIdentity;
  console.log(stoleSecretIdentity());
  console.log(stoleSecretIdentity.call(hero));
  console.log(stoleSecretIdentity.bind(hero)());
  console.log(hero.getSecretIdentity());
};
// closure()


const thisCheck = _ => {
  const length = 10;

  function fn() {
    return this.length;
  }

  const obj = {
    length: 5,
    method: function (fn) {
      console.log('length, from object function', this.length);
      console.log('length, from outer function', fn.call(this)); // 5 
      // (in browser - it will be 10), because for fn this===global object, witch is prohibited in es6
      console.log('length, from arguments[0] function', arguments[0]()); // 2 - for fn this === arguments object
    }
  };

  obj.method(fn, 1);
};
// thisCheck()

const checkTry = _ => {
  // we have here x, y already
  (function () {
    try {
      throw new Error();
    } catch (x) { // hoisted var is revrited with with inner var in catch and don't ask that is some heavy shit
      // const, let x = ... -> will cost error that x is already been declared 
      var x = 1, y = 2; // since x is now inner because of catch(x) - it stays here, but y wasn't rewritted is lives
                        // outer
      console.log(x); //1
    }
    console.log(x);//undefined
    console.log(y);//2
  })();
};
// checkTry()

const cloneObject = _ => {
  const toBeCloned = {
    simpleVar: 'simpleVar',
    nan: NaN,
    'undefined': undefined,
    'null': null,
    'number': 1,
    boolean: true,
    'function': function () {
    },
    innerObject: {innerObjectValue: 'innerObjectValue'},
    array: []
  };

  /* Be aware that JSON.stringify doesn't clone functions and properties with undefined value */
  const jsonSimpleClone = JSON.parse(JSON.stringify(toBeCloned));
  console.log('jsonSimpleClone: %j', jsonSimpleClone);
  console.assert(jsonSimpleClone !== toBeCloned, 'jsonSimpleClone are not a clone');
  console.assert(jsonSimpleClone.innerObject !== toBeCloned.innerObject, `jsonSimpleClone innerObjects are not cloned`);

  /* Output with JSON. stringify(object_to_serialize, replacer, spaces_to_print) */
  console.log(JSON.stringify(toBeCloned, null, ' '));
  console.log(JSON.stringify(toBeCloned, null, '-|'));


  const objectAssignClone = Object.assign({}, toBeCloned);
  console.log('objectAssignClone: %j', objectAssignClone);
  console.assert(objectAssignClone !== toBeCloned, 'objectAssignClone are not a clone');
  // console.assert(objectAssignClone.innerObject !== toBeCloned.innerObject,
  //   `objectAssignClone innerObjects are not cloned`) /*will fire*/

  const spreadClone = {...toBeCloned};
  console.log('spreadClone: %j', spreadClone);
  console.assert(spreadClone !== toBeCloned, 'spreadClone are not a clone');
  // console.assert(objectAssignClone.innerObject !== toBeCloned.innerObject,
  //   `spreadClone innerObjects are not cloned`) /*will fire*/

  // Functions isn't copied at all(
};

// cloneObject()


class A {
  constructor() {
    this.arr = [];
  }
}

class B extends A {
  add() {
    this.arr.push(1);
  }

  add2() {
    this.arr = [];
    this.arr.push(2);
  }
}

const b1 = new B;
const b2 = new B;

b1.add();
b1.add2();

// console.log(b1.arr); // [2]
// console.log(b2.arr); // []
