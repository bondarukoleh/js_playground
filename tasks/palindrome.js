function reverseSimple(str){
  return str.split('').reverse().join('');
}
console.log(reverseSimple('aass'));

function reverseLoop(str){
  return Array.prototype.reduceRight.call(str, (acc, cur) => acc += cur)
}
console.log(reverseLoop('aass'));

function pallindrome(str){
  return str === reverseLoop(str).toLowerCase()
}
console.log(pallindrome('asddsa'))