const sliceSplice = _ => {
  const a = ['a', 'b', 'c', 'd']
  console.log(a.slice(1, 3)); // [b, c]
  a.splice(1, 2, 'B', 'C'); //[ 'a', 'B', 'C', 'd' ]
  console.log(a);
}
// sliceSplice()