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

checkFloatingPointProblem();
