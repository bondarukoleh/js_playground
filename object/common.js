function isPlainObject(object) {
  return Object.getPrototypeOf(object) === Object.prototype;
}

console.log(isPlainObject([])); // false
console.log(isPlainObject({})); // true

function fromEntries() {
  /* If Object.entries({a: 1}) returns [["a", 1]], this does opposite */
  cl(Object.fromEntries([["a", 1]])) //{a: 1}
}
// fromEntries()
