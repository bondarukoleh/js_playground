const cl = console.log;
// Few examples with scope. Scope only global or local of some function, or block.

// global scope variable
function globalSimple(){
  var globalScope = 1;
  (() => cl(`From global: ${globalScope}`))()
}
// globalSimple()

// local scope variable
function localSimple() {
  var data = 1;
  cl(`From global: "${data}"`)
  const printVar = (data) => {
    // variable "data" here is local, it prints passed value, not the global one
    cl(`data from local: "${data}"`)
  }
  printVar(2)

  const printVar2 = () => {
    var data = 'local'
    cl(`data from local: "${data}"`) // another local variable
  }
  printVar2()
}
// localSimple()

function intermediate(){
  var v = 1;

  const try1 = () => {
    if(true){
      var v = 2;
    }
    cl(v) // 2 local
  }
  try1()

  const try2 = () => {
    if(true){
      let v = 2; // is lost in block scope
    }
    cl(v) // 1 
  }
  try2()
}
// intermediate()