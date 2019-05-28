const promise = function(value){
	return new Promise(
	function (resolve, reject){
	setTimeout(() => {
		console.log('promise resolved')
		resolve(value)
	}, 500)
})
};

function* superGenerator(){
	yield promise('first value')
};

const generator = superGenerator();
generator.next().value.then((res)=>{console.log(res)});