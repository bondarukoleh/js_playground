Function.prototype.myBind = function (context, ...predefinedArgs) {
  // self is pointing to the Function prototype where apply() is present
  // without "self", this in the returned function will point to dynamic context
  const self = this;
  return function (...args) {
    self.apply(context, predefinedArgs.length ? [...predefinedArgs, ...args] : args);
  };
};

const o = {
  a: 'simple prop'
};

function f(arg1, arg2) {
  console.log(`function got such args: ${arg1}, ${arg2}`);
  console.log(`Context value: ${this.a}`);
}

// const bound1 = f.myBind(o);
// bound1(1, 2); // function got such args: 1, 2
//
// const bound2 = f.myBind(o, 1);
// bound2(2); // function got such args: 1, 2


function knowHowItsCalled() {
  function WeirdFunc() {
    console.log(new.target);
  }

  WeirdFunc() // undefined
  const a = new WeirdFunc() // [Function: weirdFunc]
  WeirdFunc.call({ 'a': 1 }) // undefined
}

// knowHowItsCalled();
