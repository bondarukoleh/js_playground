const cl = console.log;
const sliceSplice = _ => {
  const a = ['a', 'b', 'c', 'd'];
  cl(a.slice(1, 3)); // [b, c]
  cl(a); // ['a', 'b', 'c', 'd']
  a.splice(1, 2, 'B', 'C', 'D');
  cl(a); // [ 'a', 'B', 'C', 'D', 'd' ]
};
// sliceSplice()


// make array from iterable object
const o = {a: 1};
const s = 'some string';

function f() {
  const argsArraySlice = Array.prototype.slice.call(arguments);
  cl(argsArraySlice); // [ { a: 1 }, 'some string' ]
  cl(Array.isArray(argsArraySlice)); // true
  const arrFrom = Array.from(arguments);
  cl(Array.isArray(arrFrom)); // true
  const arrDestr = [...arguments];
  cl(Array.isArray(arrDestr)); // true
}

// f(o, s)

/*reusing push on simple object*/
const obj = {
  add(val) {
    Array.prototype.push.call(this, val);
  }
};
// obj.add('value');
// cl(Object.getOwnPropertyNames(obj)); // [ '0', 'add', 'length' ]
// cl(obj[0]); // value
// cl(obj.length); // 1

// flatMap()
/** If you need to filter and map at the same time
 *  from map part it can return more than one object, that will be flattened in the end in one array
 */
function flatM() {
  const arr = [1, 2, 3]
  cl(arr.flatMap((value) => value === 2 ? [2, 333] : [value])) //[ 1, 2, 333, 3 ]
}
// flatM()


function flat() {
  cl([1, [2], 3].flat()) //[ 1, 2, 3 ]
}
// flat()



