cl = console.log;
function showProp(obj){
	for(const p in obj){
		cl('prop ', p, ' is enumerable')
	}
}
function checkClassType () {
class A {
	constructor(){
		this.aProp = 'A property';
	}
}

class B extends A {
	constructor(){
		super()
	  this.bProp = 'B property';
	}
}

const b = new B();
cl(b instanceof B);
cl(b instanceof A);
cl(b.constructor === B);
cl(b.constructor === A);
cl(b.constructor);
cl(B.prototype.__proto__.constructor);
cl('aProp in b', 'aProp' in b)
cl('bProp ownProperty in b', b.hasOwnProperty('aProp'));
cl('bProp ownProperty in b', b.hasOwnProperty('bProp'));
const a = new B.prototype.__proto__.constructor();
cl(a instanceof A);
}
// checkClassType()

 function A(){
 	this.aProp = 'aProp'
 }
 A.prototype.cMethod = () => cl('C method')
 
 function B (){
 	A.call(this)
 	 cl('c m in this', this.__proto__.cMethod)
 	 cl('b m in this',this.__proto__.bMethod)
 	 cl(this.aProp)
 	this.bProp = 'bProp'
 }
 B.prototype=Object.create(A.prototype); 
 //B.prototype.constructor = B; value will be enumerable, which is wrong
 Object.defineProperty(B.prototype, 'constructor', {configurable:true, enumerable:false, value:B})
 showProp(B.prototype)
 B.prototype.bMethod = () => cl('B method');
 //B.prototype.__proto__ = A.prototype cheat
const b = new B();
cl('b instanceof B',  b instanceof B);
cl('b instanceof A', b instanceof A);
cl('b constr = B', b.constructor === B);
cl('b constr = A',b.constructor === A);
cl('b constr', b.constructor);
cl('b prototype proto construct',B.prototype.__proto__.constructor);
cl('aProp in b', 'aProp' in b)
cl('aProp ownProperty in b', b.hasOwnProperty('aProp'));
cl('bProp ownProperty in b', b.hasOwnProperty('bProp'));
const a = new B.prototype.__proto__.constructor();
cl('a instanceof A', a instanceof A);
 
 
