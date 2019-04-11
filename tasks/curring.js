// sum(2,3) || sum(2)(3) -> 5
const cur = (num1, num2) => {
  return num2 ? num1 + num2 : (num2) => num1 + num2
}
console.log(cur(2)(3) == 5);
console.log(cur(2,3) == 5);