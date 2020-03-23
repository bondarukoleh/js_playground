const map = () => {
  const map = new Map();
  map.set('cat', 'meow').set('dog', 'woof');
  console.log(map.get('dog'));
  console.log(map.has('cat'));
  console.log(map.size);
  for (const [key, value] of map) {
    console.log(key, value);
  }

  for (const item of map) {
    console.log(item[0], item[1]);
  }
};

const weakMap = () => {
  const weakMap = new WeakMap();
  const someObject = {key: 'some key'};
  weakMap.set(someObject, 'Value'); // keys has to be objects
  // weakMap.set('not object', 'Value') /* error */
  console.log(weakMap.get(someObject));
  // for(const entry of weakMap){
  //   console.log(entry); /* Error, weakMap is not iterable */
  // }
};

const set = () => {
  const set = new Set();
  set.add('Some unic value');
  set.add('Some other unic value');
  for (const key of set) {
    console.log(key);
  }

  // weakSet - same story that map

  // make uniq array
  const arrayWithDuplicates = ['one', 'one', 'two', 'three', 'three'];
  const arrUniq = [...new Set(arrayWithDuplicates)];
  console.log(arrUniq);

  const set1 = new Set(['one', 'two', 'three']);
  const set2 = new Set(['two', 'three', 'four']);
  const setFromTwo = new Set([...set1, ...set2]);
  console.log(setFromTwo);

  const setWithDuplicatedValues = new Set([...set1].filter(val => set2.has(val)));
  console.log(setWithDuplicatedValues);
};
// set();