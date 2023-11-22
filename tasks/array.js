const assert = require('assert');

const addingToArray = _ => {
  const arr = ['begining', 'midle', 'end'];

  console.log(arr.push('pushed to end')); // 4
  console.log(arr); //[ 'begining', 'midle', 'end', 'pushed to end' ]
  console.log(arr.shift()); // 'begining'
  console.log(arr); // [ 'midle', 'end', 'pushed to end' ]
  console.log(arr.unshift('new begining')); // 4
  console.log(arr); // [ 'new begining', 'midle', 'end', 'pushed to end' ]
  console.log(arr.splice(0, 0, 'splice begining')); // []
  console.log(arr); //[ 'splice begining', 'new begining', 'midle', 'end', 'pushed to end' ]
  console.log(['spread begining', ...arr]);//['spread begining', 'splice begining', 'new begining', 'midle', 'end',
                                           // 'pushed to end' ]
};
// addingToArray()
const checkIsArray = _ => {
  console.log(Object.prototype.toString.call([])); // [object Array]
  console.log(Array.isArray([])); // true
};
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

};
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
};
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
};
// iterationArrayMethods()

const t1 = () => {
  const samurai = [];
  samurai.push("Oda");
  samurai.unshift("Tomoe");
  samurai.splice(1, 0, "Hattori", "Takeda");
  samurai.pop();
  console.log(samurai); //[ 'Tomoe', 'Hattori', 'Takeda' ]
};
// t1()

const t2 = () => {
  const samuraiClanMap = new Map();
  const samurai1 = {name: "Toyotomi"};
  const samurai2 = {name: "Takeda"};
  const samurai3 = {name: "Akiyama"};
  const oda = {clan: "Oda"};
  const tokugawa = {clan: "Tokugawa"};
  const takeda = {clan: "Takeda"};
  samuraiClanMap.set(samurai1, oda);
  samuraiClanMap.set(samurai2, tokugawa);
  samuraiClanMap.set(samurai2, takeda);

  assert(samuraiClanMap.size === 3, "There are not three mappings"); // fail
  assert(samuraiClanMap.has(samurai1), "The first samurai does not have a mapping");
  assert(samuraiClanMap.has(samurai3), "The third samurai does not have a mapping"); //fail
};
// t2()

const t3 = () => {
  const samurai = new Set(["Toyotomi", "Takeda", "Akiyama", "Akiyama"]);
  assert(samurai.size === 4, "There are four samurai in the set"); //fail
  samurai.add("Akiyama");
  assert(samurai.size === 5, "There are five samurai in the set"); //fail
  assert(samurai.has("Toyotomi", "Toyotomi is in!"));
  assert(samurai.has("Hattori", "Hattori is in!")); //fail
};
// t3()