const cl = console.log
const sliceSplice = _ => {
  const a = ['a', 'b', 'c', 'd']
  cl(a.slice(1, 3)) // [b, c]
  cl(a) // ['a', 'b', 'c', 'd']
  a.splice(1, 2, 'B', 'C', 'D')
  cl(a) // [ 'a', 'B', 'C', 'D', 'd' ]
}
// sliceSplice()


// make array from iterable object
const o = {a: 1}
const s = 'some string'

function f() {
  const argsArraySlice = Array.prototype.slice.call(arguments)
  cl(argsArraySlice); // [ { a: 1 }, 'some string' ]
  cl(Array.isArray(argsArraySlice)) // true
  const arrFrom = Array.from(arguments)
  cl(Array.isArray(arrFrom)) // true
  const arrDestr = [...arguments]
  cl(Array.isArray(arrDestr)) // true
}
// f(o, s)

/*reusing push on simple object*/
const obj = {
  add(val) {
    Array.prototype.push.call(this, val)
  }
}
obj.add('value')
cl(Object.getOwnPropertyNames(obj)) // [ '0', 'add', 'length' ]
cl(obj[0]) // value
cl(obj.length) // 1





