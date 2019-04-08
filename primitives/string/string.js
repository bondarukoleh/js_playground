const substringFunc = _ => {
  const a = 'some string';
  console.log(a.substring(1, 5)); //ome
}
// substringFunc()

const charAtFunc = _ => {
  const a = 'some string';
  console.log(a.charAt(1)); //o
  console.log(a.charAt(20)); // ''
  console.log(a[20]); // undefined
  console.log(a.repeat(2)); //'some stringsome string'
}
charAtFunc()