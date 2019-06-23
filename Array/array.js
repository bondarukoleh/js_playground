const cl = console.log;
const sliceSplice = _ => {
  const a = ['a', 'b', 'c', 'd']
  console.log(a.slice(1, 3)); // [b, c]
  a.splice(1, 2, 'B', 'C', 'D'); //[ 'a', 'B', 'C', 'D', 'd' ]
  console.log(a);
}
// sliceSplice()


// make array from iterable object
const o = {a: 1};
const s = 'some string';

function f(){	
	const argsArraySlice = Array.prototype.slice.call(arguments);
cl(Array.isArray(argsArraySlice));
const arrFrom = Array.from(arguments);
cl(Array.isArray(arrFrom));
const arrDestr = [... arguments];
cl(Array.isArray(arrDestr));
}
//f(o, s)

/*reusing push on simple object*/
const obj = {
	add (val){
		Array.prototype.push.call(this,val)
	}
}
obj.add('value')
cl(Object.getOwnPropertyNames(obj))
cl(obj[0])// value
cl(obj.length)// 1





