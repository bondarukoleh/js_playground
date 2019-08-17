Function.prototype.myBind = function (context, ...predefinedArgs) {
    const self = this;
    return function(...args) {
      predefinedArgs ? self.apply(context, [...predefinedArgs, ...args]) : self.apply(context, ...args)
    }
}

const o = {
  a: 'simple prop'
}

function f(arg1, arg2) {
  console.log(`function got such args: ${arg1}, ${arg2}`)
  console.log(`Context value: ${this.a}`);
}

const bound1 = f.myBind(o)
bound1(1, 2) // function got such args: 1, 2

const bound2 = f.myBind(o, 1)
bound2(2) // function got such args: 1, 2


