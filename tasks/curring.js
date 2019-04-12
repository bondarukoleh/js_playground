// curring(2,3) || curring(2)(3) -> 5
const curring = (num1, num2) => {
  return num2 ? num1 + num2 : (num2) => num1 + num2
}
console.log(curring(2)(3) == 5);
console.log(curring(2,3) == 5);

// curring(2)(3) || curring(1)(2)(2) -> 5 || curring(1)(1)(1)(2) -> 5
function curring2(num){
  let sum = num
  const f = (nextParameter) => {
    sum += nextParameter
    return f
  }
  f.valueOf = _ => sum
  return f
}
console.log(curring2(2)(3) == 5, curring2(1)(2)(2) == 5, curring2(1)(1)(1)(2) == 5);