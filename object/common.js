function isPlainObject(object) {
  return Object.getPrototypeOf(object) === Object.prototype;
}

console.log(isPlainObject([])); // false
console.log(isPlainObject({})); // true
