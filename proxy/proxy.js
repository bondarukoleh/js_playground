class ProxyClass {
	constructor(){
		this.someProperty = 'value';
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
		}
	})
}

const proxy = makeProxy(new ProxyClass())
proxy.someProperty = 'new value';
console.log(proxy);
