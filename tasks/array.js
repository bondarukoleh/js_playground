const addingToArray = _ => {
  const arr = ['begining', 'midle', 'end'];

  console.log(arr.push('pushed to end')) // 4
  console.log(arr); //[ 'begining', 'midle', 'end', 'pushed to end' ]
  console.log(arr.shift()); // 'begining'
  console.log(arr); // [ 'midle', 'end', 'pushed to end' ]
  console.log(arr.unshift('new begining')); // 4
  console.log(arr); // [ 'new begining', 'midle', 'end', 'pushed to end' ]
  console.log(arr.splice(0, 0, 'splice begining')); // []
  console.log(arr); //[ 'splice begining', 'new begining', 'midle', 'end', 'pushed to end' ]
  console.log(['spread begining', ...arr]);//['spread begining', 'splice begining', 'new begining', 'midle', 'end', 'pushed to end' ]
}
// addingToArray()
const checkIsArray = _ => {
  console.log(Object.prototype.toString.call([])); // [object Array]
  console.log(Array.isArray([])); // true
}
// checkIsArray()

const mutableArrayMethods = _ => { 
  // Modify given array
  // copyWithin
  // fill
  // pop
  // push
  // reverse (returns reversed, and changes given array)
  // shift 
  // sort (returns sorted, and changes given array)
  // splice
  // unshift
  const arr = ['begining', 1, 'midle', 2, 'end'];
  console.log(arr.pop()); // end
  console.log(arr); //[ 'begining', 1, 'midle', 2 ]
  console.log(arr.sort()); //[ 1, 2, 'begining', 'midle' ]
  console.log(arr); //[ 1, 2, 'begining', 'midle' ]
  console.log(arr.splice(0, 2, 'Changed 0 index elem', 'Changed 1 index elem')); // [1, 2]
  console.log(arr); //[ 'Changed 0 index elem', 'Changed 1 index elem', 'begining', 'midle' ]

}
// mutableArrayMethods()

const accestorArrayMethods = _ => {
  // Do not modify given array
  // concat
  // includes
  // indexOf
  // join
  // lastIndexOf
  // slice
  // toSource(
  // toString
  // toLocaleString
}
// accestorArrayMethods()

const iterationArrayMethods = _ => {
  // entries
  // every
  // filter
  // find
  // findIndex
  // forEach
  // keys
  // map
  // reduce
  // reduceRight
  // some
  // values
  // @@iterator]
}
// iterationArrayMethods()

