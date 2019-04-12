const stashOverF = _ => {
  const list = new Array(10000000).fill('some value');
  const nextListItem = function () {
    const item = list.pop();
    if (item) {
      // nextListItem(); /* stackoverflow */
      setTimeout(nextListItem, 0); // fix
    }
  };  
}

const factorial = num => { // all natural numbers from num to 1 myltiplied to each other
  console.log((function f(n){return ((n > 1) ? n * f(n-1) : n)})(num)) //6
}
// factorial(3)

// fib = fn = fn-1 + fn-2
// fib(3) // 2
// fib(7) // 13
// fib(77) // 5527939700884757
function fibonachi(num){
  return (num <= 1) ? num : fibonachi(num - 1) + fibonachi(num - 2);
}
console.log(fibonachi(3));
console.log(fibonachi(7));