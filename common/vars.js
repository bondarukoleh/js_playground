function checkHoist() {
  console.log(`First: ${someVar}`); // First: function someVar(){}
  var someVar = 1;
  console.log(`Second: ${someVar}`); // Second: 1
  function someVar() {
  }

  console.log(`Third: ${someVar}`); // Third: 1
}

// checkHoist() // as you can see first function is hoisted, and then re-write with variable

function checkHoistVarAndFunc() {
  // console.log(`First: ${someLet}`) // ReferenceError: someLet is not defined
  let someLet = 1;
  console.log(`Second: ${someLet}`); // Second: 1
}

// checkHoistVarAndFunc()