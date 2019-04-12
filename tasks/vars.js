// var vs let, const
// You cannot declare two variables with same name (let, const)
// let, const NEVER hoist
// function expression since it a variable at the first place - also never hoist, declaration - do

const letConst = _ => {
  let letVar; // no error.
  // const constVar; /*SyntaxError:, without initializer */
  // console.log(constVar); /* ReferenceError: Missing initializer*/
  // console.log(fExpression);/* ReferenceError: fExpression is not defined*/
  console.log(fDeclaration);
  {
    const a = 'inner'
    console.log(a)
  }
  const constVar = 'outher'
  const fExpression = _ => { }
  function fDeclaration() { }
  // constVar = 'asd' /*TypeError: Assignment to constant variable */
}

const hoist1 = _ => {
  let x = 21;
  const girl = function () {
      // var x is hoisted, but not defined
      console.log(x);
      var x = 20;
  };
  girl ();
}
hoist1()