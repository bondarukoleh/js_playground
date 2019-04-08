/*If we’d like not to write down the zeroes explicitly,
the same number is: let ms = 1e-6; //0.000001
The method num.toString(base) returns a string representation of num
in the numeral system with the given base.*/
let num = 255;
console.log(num.toString(16));  // ff
console.log(num.toString(2)); //11111111
/*The base can vary from 2 to 36. By default it’s 10.
Two dots to call method on number*/
console.log(123456..toString(36)); // 2n9c

/*The method toFixed(n) rounds the number to n digits after the point and
returns a string representation of the result.*/
let num1 = 12.36;
console.log(num1.toFixed(1)); // "12.4"
/*Please note that result of toFixed is a string. If the decimal part is shorter
than required, zeroes are appended to its end:*/
let num2 = 12.34;
console.log(num2.toFixed(5)); // "12.34000", added zeroes to make exactly 5 digits

// NaN
const isNaN = _ => {
  const a = NaN, b = NaN;
  console.log(a === b); // false
  console.log(Object.is(a, b)); // true
}
// isNaN()

