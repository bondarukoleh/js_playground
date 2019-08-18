class ProxyClass {
	constructor(addition_param = false){
		this.someProperty = 'value';
		this.param = addition_param;
	}
	someMethod (arg) {
		console.log(arg)
	}
}

function makeProxy(target){
	return new Proxy(target, {
		set: (target, key, value) => {
			if(key === 'someProperty'){
				console.log('setting some prop value: ', value)
				target[key] = value;
			}
		},
		construct(target, argArray, newTarget) {
			console.log('Constructor called');
			return new ProxyClass('Addition param from proxy');
		}
	})
}

const MyClass = makeProxy(ProxyClass)
const myInstance = new MyClass()
myInstance.someProperty = 'new value';
console.log(myInstance);
console.log(Object.getPrototypeOf(myInstance));
