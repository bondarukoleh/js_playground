const map = new Map();
map.set('cat', 'meow').set('dog', 'woof');
console.log(map.get('dog'));
console.log(map.has('cat'));
console.log(map.size);
for(const [key, value] of map){
  console.log(key, value);
}

const weakMap = new WeakMap();
const someObject = {key: 'some key'};
weakMap.set(someObject, 'Value') // keas has to be objects
// weakMap.set('not object', 'Value') /* error */
console.log(weakMap.get(someObject));
// for(const entrie of weakMap){
//   console.log(entrie); /* Error, weakMap is not iterable */
// }


const set = new Set();
set.add('Some unic value');
set.add('Some other unic value');
for(const key of set){
  console.log(key);
}

// weakSet - same story that map