const merge = _ => {
  const first = { a: 1 };
  const second = { b: 2, f() { }, c: {} };
  const clone = Object.assign({}, second);
  console.log(clone === second); // false
  console.log(clone.c === second.c); // true, clonning references to inner objects
  console.log(Object.assign(first, second));
  console.log({ ...first, ...second });

}
// merge()

const descriptors = _ => {
  const first = { a: 1 };
  console.log(Object.getOwnPropertyDescriptor(first, 'a'));
  //{ value: 1, writable: true, enumerable: true, configurable: true }
  Object.defineProperty(first, 'b', {
    value: 'b value',
    writable: false,
    enumerable: true,
    configurable: false
  })
  first.b = 'new value' //silently doing nothing
  const newOne = {a: 1}
  Object.freeze(newOne)
  newOne.b = 'new value' //silently doing nothing
  console.log(newOne);
}
// descriptors()

// writable – if true, can be changed, otherwise it’s read-only.
// enumerable – if true, then listed in loops, otherwise not listed.
// configurable – if true, the property can be deleted and these attributes can be modified, otherwise not.

const getDesc = () => {
  const obj = {
    a: 1,
    b: 2
  }
  console.log(Object.getOwnPropertyDescriptors(obj));
}
getDesc()