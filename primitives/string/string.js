const substringFunc = _ => {
  const a = 'some string';
  console.log(a.substring(1, 5)); //ome
};
// substringFunc()

const charAtFunc = _ => {
  const a = 'some string';
  console.log(a.charAt(1)); //o
  console.log(a.charAt(20)); // ''
  console.log(a[20]); // undefined
  console.log(a.repeat(2)); //'some stringsome string'
};
// charAtFunc()

stringLoop = () => {
  const str = 'somestring';
  for (const s of str) {
    // console.log(s);
  }
  // Array.prototype.forEach.call(str, (s, i, arr) =>  console.log(s))
  // console.log(Array.prototype.reduceRight.call(str, (acc, cur) => {acc += cur; return acc},''))
  // console.log(str.split('').reverse().join(''))
};
stringLoop();