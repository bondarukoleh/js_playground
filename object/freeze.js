/*The Object.freeze() - no changes to object at all;
properties not changed, added, removed, changes to enumerability, configurability,
or writability - prohibited. prototype not changed.*/

const freeze = () => {
  let o = {prop: 1};
  o = Object.freeze(o);
  console.log(o.prop) // 1
  o.prop = 2; //silently nothing, prop not changed
  console.log(o.prop) // 1
  delete o.prop
  console.log(o.prop) // 1
  // Object.defineProperty(o, 'prop', {configurable: true}) // error
  o.newProp = 2; //silently nothing, prop not added
  console.log(o.newProp) // undefined
  // Object.setPrototypeOf(o, null)  // error
  console.log(Object.getPrototypeOf(o).toString()); // [object Object]
  console.log(Object.isFrozen(o)); // true
  console.log(o)
}
// freeze()

/*The Object.seal() new properties not added, marking all existing properties as non-configurable. 
properties can still be changed as long as they are writable. */
const seal = () => {
  let o = {prop: 1};
  o = Object.seal(o);
  console.log(o.prop) // 1
  o.prop = 2; //changes prop
  console.log(o.prop) // 2
  delete o.prop // silently not removed
  console.log(o.prop) // 
  // Object.defineProperty(o, 'prop', {configurable: true}) // error
  o.newProp = 3; //prop added
  console.log(o.newProp) // 3
  // Object.setPrototypeOf(o, null)  // error
  delete o.newProp // properties added after seal - just regular one, can be removed
  console.log(o.newProp) // undefined
  console.log(Object.isSealed(o)); // true
}
// seal()

const preventExtension = () => {
  let o = {prop: 1};
  o = Object.preventExtensions(o)
  o.prop = 2;
  console.log(o.prop); // changed
  o.newValue = 3; // silently not added
  console.log(o.newValue);// undefined
  console.log(Object.isExtensible(o)); // false
}
// preventExtension()