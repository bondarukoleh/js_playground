function checkSymbFor() {
  const a = Symbol('A') // creates a new symbol
  const aa = {}
  aa[a] = 1

  const b = Symbol('A') // also creates
  aa[b] = 2

  const s = Symbol.for('A') // creates only if no symbol in global registry, if there is - returns existing
  aa[s] = 3

  console.log(aa[a]); // 1
  console.log(aa[b]); // 2
  console.log(aa[Symbol.for('A')]); // 3
  console.log(Symbol.keyFor(s)); // A - returns key from what symbol created
}

checkSymbFor()
