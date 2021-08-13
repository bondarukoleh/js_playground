// 0.3 problem

function checkFloatingPointProblem() {
  const a = 0.1;
  const b = 0.2;

  if(a + b === 0.3){
    console.log('Yay!'); // never logs it
  }

  // first option - use epsilon. The epsilon is the margin of error inherent to floating-point math
  if((a + b) - 0.3 < Number.EPSILON){
    console.log('Yay with epsilon!');
  }
}

// checkFloatingPointProblem();

function checkNumbers(){
  // better check with static Number methods, they are more strict
  console.log(isFinite(42)); // => true
  console.log(isFinite('42')); // => true
  console.log(Number.isFinite(42)); // => true // Returns true if n is not Infinity, -Infinity, or NaN
  console.log(Number.isFinite('42')); // => false

  console.log(isNaN(NaN));   // => true
  console.log(isNaN('foo'));   // => true
  console.log(Number.isNaN(NaN)); // => true
  console.log(Number.isNaN('foo')); // => false

  // but
  const string = 'foo';
  const nan = Number(string);
  console.log(Number.isNaN(nan)); // => true
}
checkNumbers();
