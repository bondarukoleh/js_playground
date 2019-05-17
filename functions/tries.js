function aa(){
  console.log(f())
}
// const a = f() // error
// aa() // error because we invoking aa before f is initialized
const f = () => 1;
// aa() // not error because we invoking aa has access to [[outer]] scope where f is already initialized.
// console.log(a)

// global scope
const func = function(){
  // func scope:
    // [[Environment]]: func scope
    // innerValue
    // inner
    // [[Outer]] -> global scope
  const innerValue = 'InnerValue';
  function inner (){
    // inner scope:
    // [[Environment]]: inner scope
    // [[Outer]] -> func scope
    console.log(innerValue)
  }
  return inner;
}

const returnedInner = func()
returnedInner()

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
