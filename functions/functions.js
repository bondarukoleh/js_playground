/* Arrow functions can’t run with new
Arrow functions also have no "arguments" variable.
functions methods .bind(this)/.call()/.apply() doesn’t create any binding on arrow. 
Arrow functions also don’t have super */

function outerFunc(func) { func() }
class A {
  constructor() {
    this.data = 'InnerData'
  }
  innnerFunc() {
    console.log(this.data)
  }
  checkThis() {
    outerFunc(function() {this.innnerFunc()}.bind(this))
    outerFunc(() => this.innnerFunc())
  }
}
const a = new A()
a.checkThis()