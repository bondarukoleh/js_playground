const cl = console.log;
// Few examples with scope. Scope only global or local of some function, or block.

// global scope variable
const globalScope = 1;
function globalSimple(){
  (() => cl(`From global: ${globalScope}`))()
}
// globalSimple();

// local scope variable
function localSimple() {
  const data = 1;
  cl(`From local to localSimple func: "${data}"`);
  const printVar = (data) => {
    // variable "data" here is local for printVar, it prints passed value, not the global one
    cl(`data from local printVar: "${data}"`)
  };
  printVar(2);

  const printVar2 = () => {
    const data = 'local';
    cl(`data from local printVar2: "${data}"`) // another local variable
  };
  printVar2()
}
// localSimple();

function intermediate(){
  let v = 1;

  const try1 = () => {
    if(true){
      var v = 2; // this will go out block
      // let v = 2; // this won't take effect - because it will stay in if block
    }
    // let v = 5 // error - we cannot redeclare "var v" in this block
    cl(v) // 2 local
  };
  try1();

  const try2 = () => {
    if(true){
      let v = 2; // is lost in block scope
    }
    cl(v) // 1 
  };
  try2()
}
// intermediate();