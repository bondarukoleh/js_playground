function aa() {
  console.log(f());
}

// const a = f() // error because it's not hoisted
// aa() // error because we invoking aa before f is initialized
const f = () => 1;
// aa() // not error because we invoking aa has access to [[outer]] scope where f is already initialized.

// global scope:
// [[Environment]]: global scope
// value
// func
// [[Outer]] -> global scope
const value = 'global value';
const func = function () {
  // func scope:
  // [[Environment]]: func (local) scope
  // innerValue
  // inner
  // [[Outer]] -> global scope
  const value = 'inner Value';

  function innerFunc() {
    // inner scope:
    // [[Environment]]: inner scope
    // [[Outer]] -> func scope
    console.log(value);
  }

  return innerFunc;
};

const returnedInnerFunc = func();
// returnedInnerFunc() // 'inner Value' because innerFunc created in func

/*
Stack:
--global--

then
--func-- // here the [[Outer]] link for inner function is set to func [[Environment]]
--global--

Then
--returnedInner-- // [[outer]].innerValue grabbed from func [[Environment]]
--global--
*/

// another example

function withInnerFunction() {
  const value = 'First value';

  function innerFunction() {
    console.log(value);
  }

  const arrowInner = () => console.log(value);
  return {innerFunction, arrowInner};
}

function withoutInnerFunction() {
  const value = 'Second value';
  const {innerFunction, arrowInner} = withInnerFunction();
  innerFunction(); // 'First value' // because function was CREATED inside
  arrowInner(); // 'First value' as you can see arrow doesn't have this, but it has same scope behavior
}

// withoutInnerFunction();