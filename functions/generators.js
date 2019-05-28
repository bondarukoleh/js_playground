/* We can pass value to generators, and passed value becomes new value of whole yield expression, but there is exeption:
We can pass value only to WAITING yield, 
that's why we cannot pass anything to first next, nothing is waiting, no yield is suspended. 
To pass to first yield, we can use just argument when we inicialize generator to iterator. 
*/
function* twoWayGen(value){
	const passedSecondArg = yield (`Executed immediatly expression ${value}`) 
	
	console.log(`This is passed thru second next ${passedSecondArg}`)
	
	yield `This is passed thru second next also! ${value}! `
}

const gen = twoWayGen("first")
const f = gen.next()
const f1 = gen.next()




