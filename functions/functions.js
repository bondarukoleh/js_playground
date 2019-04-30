/*
Arrow functions can’t run with new
Arrow functions also have no "arguments" variable.
functions methods .bind(this)/.call()/.apply() doesn’t create any binding on arrow. 
Arrow functions also don’t have super 
REMEMBER: you cannot () => {}.bind(this) -> error. Only put it in variable, and then bind.
*/

function outerFunc(func) { func() }
class A {
  constructor() {
    this.data = 'InnerData'
  }
  innnerFunc() {
    console.log(this.data)
  }
  checkThis() {
    outerFunc(function () { this.innnerFunc() }.bind(this))
    outerFunc(() => this.innnerFunc())
  }
}
const a = new A()
a.checkThis()

function Prefixer(prefix) {
  this.prefix = prefix;
}

Prefixer.prototype.addPrefixToArray = function (arr) {
  // this - prefixer
  return arr.map(function (x) {
    // this - arr
    // arr knows nothing about prefixer
    return this.prefix + x;
  });
};
const prefixer = new Prefixer('Hi ');
console.log(prefixer.addPrefixToArray(['Joe', 'Alex'])); // [ 'undefinedJoe', 'undefinedAlex' ]

// Solution 1:that = this (self)
Prefixer.prototype.addPrefixToArray = function (arr) {
  const that = this;
  return arr.map(function (x) {
    return that.prefix + x;
  });
};
console.log(prefixer.addPrefixToArray(['Joe', 'Alex'])); // [ 'Hi Joe', 'Hi Alex' ]
// Solution 2: specifying a value for this in map
Prefixer.prototype.addPrefixToArray = function (arr) {
  return arr.map(function (x) {
    return this.prefix + x;
  }, this); // Some array functions can be configured with this.
};
console.log(prefixer.addPrefixToArray(['Joe', 'Alex'])); // [ 'Hi Joe', 'Hi Alex' ]
// Solution 3:bind(this)
Prefixer.prototype.prefixArray = function (arr) {
  return arr.map(function (x) {
    return this.prefix + x;
  }.bind(this));
};
console.log(prefixer.addPrefixToArray(['Joe', 'Alex'])); // [ 'Hi Joe', 'Hi Alex' ]


// •Traditional functions have a dynamic this, its value is determined by how they are called.
// •Arrow functions have a lexical this, its value is determined by the surrounding scope.
Prefixer.prototype.prefixArray = function (arr) {
  return arr.map((x) => this.prefix + x) // I'm crying that's so nice
};
console.log(prefixer.addPrefixToArray(['Joe', 'Alex']));