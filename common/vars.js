function checkHoistVarAndFunc(){
  console.log(`First: ${someVar}`)
  var someVar = 1
  console.log(`Second: ${someVar}`)
  function someVar (){}
  console.log(`Third: ${someVar}`)
}
// checkHoist() // as you can see first function is hoisted, and then re-write with variable

function checkHoistVarAndFunc(){
  console.log(`First: ${someLet}`) // ReferenceError: someLet is not defined
  let someLet = 1
  console.log(`Second: ${someLet}`)
}
// checkHoistVarAndFunc()