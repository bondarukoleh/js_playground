const cl = console.log;
function funcGetSet (){
	// old way
	let innerProp = 'default value'
	function A (){
	Object.defineProperties(this, {
		'innerProp' : {get: () => {
			console.log('some check');
			return innerProp;
		}}, 
		'innerProp': {set: (value) => {
			console.log('some check befor setting ', value);
			innerProp = value
		}
	}})
	} 
	const a = new A();
	const aProp = a.innerProp;
	a.innerProp = 'new value for func';
}
//funcGetSet()
function objGetSet (){
	// in object
	let innerProp = 'default value'
	const obj = {
		get innerProp(){
			cl('some check before get');
			return innerProp;
		}, 
	set innerProp(value){
			cl('some check before set ', value);
			innerProp = value;
		}
		}
		cl(obj.innerProp)
		cl(obj.innerProp = 'new value for obj')
}
//objGetSet()
function classGetSet(){
	let privateValue = 'private'
	class A{
		get privateValue(){
			cl('checking before get private');
			return privateValue;
		}
		set privateValue(value){
			cl('checking before set private ', value);
			privateValue = value;
		}
		get someAsync(){
		return	(async () => {
				//res = await someAsAct()
				return 'async value'
			})()
		}
	}
	const a = new A()
	a.privateValue;
	a.privateValue = 'new value to class'
	a.someAsync.then(cl)
}
classGetSet()