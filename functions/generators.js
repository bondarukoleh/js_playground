/* We can pass value to generators, and passed value becomes new value of whole yield expression,
but there is exception:
We can pass value only to WAITING yield, 
that's why we cannot pass anything to first next, nothing is waiting, no yield is suspended. 
To pass to first yield, we can use just argument when we initialize generator to iterator. 
*/
const cl = console.log;

const checkPassedValueGenerator = () => {
	function* twoWayGen(value) {
		// value -> is bound to passed argument twoWayGen('INITIAL')
		// in passedThruSecondNext here we can store passed thru next(arg) value
		cl('Inside the generator');
		/* After first next() call, first yield returns string and suspends */
		/* After second next('PASSED TO 1st yield') call, suspended first yield initiate the variable with arg value,
		and execution goes on */
		const passedThruSecondNext = yield `Returned expression with ${value}`;
		cl(`This is passed thru second next ${passedThruSecondNext}`);
		/* So second next('PASSED TO 1st yield') called and SECOND yield returns a string, and suspends.
		It will store third next('PASSED TO 2nd yield') value */
		/*third next('PASSED TO 2nd yield') called, suspended second yield is woke up and got arg, but we don't store it
		anywhere, so 'PASSED TO 2nd yield' goes to nowhere */
		yield `Now we have ${value} and passed - ${passedThruSecondNext}!`;
		cl('After second yield');

		/*So third next('PASSED TO 2nd yield') called and goes here, to empty yield, and it returns undefined and suspends
		third yield will be waiting fo forth next('PASSED TO 3rd yield') value*/
		/*Forth next('PASSED TO 3rd yield') called, and third yield stores arg in variable*/
		const thirdPassedViaNextValue = yield; // we don't return anything but store passed
		cl('After third yield');
		/*forth next called, and we return value that we pass, since we catch it in previous, suspended forth yield will
		wait if fifth next will be called with some value*/
		yield thirdPassedViaNextValue;
		cl('After forth yield');
	}

	cl('Start');
	const generator = twoWayGen('INITIAL');
	cl('Generator is initiated');
	// we should not pass anything in first next, since nothing is suspended
	cl(`First return: ${generator.next(`Won't go anywhere`).value}`);
	cl('---------------------------------------------------------');
	cl(`Second return: ${generator.next('PASSED TO 1nd yield').value}`);
	cl('---------------------------------------------------------');
	cl(`Third return: ${generator.next('PASSED TO 2nd yield').value}`); //undefined, 3rd yeild is empty, but stores a value
	cl('---------------------------------------------------------');
	cl(`Fourth return: ${generator.next('PASSED TO 3rd yield').value}`);
};
// checkPassedValueGenerator()



const returnCurrentValue = () => {
	function* getCurrentPassed(initial) {
		const firstPassed = yield initial;
		const secondPassed = yield firstPassed;
		const thirdPassed = yield secondPassed;
		yield thirdPassed;
	}
	const getCurrentPassedGenerator = getCurrentPassed('Initial')
	cl(`Initial passed param: ${getCurrentPassedGenerator.next().value}`)
	cl(`First passed param: ${getCurrentPassedGenerator.next('First Passed').value}`)
	cl(`Second passed param: ${getCurrentPassedGenerator.next('Second Passed').value}`)
	cl(`Third passed param: ${getCurrentPassedGenerator.next('Third Passed').value}`)
}
// returnCurrentValue()

const accumulateValues = () => {
	function* accumulateThreeAndReturn() {
		const firstPassed = yield;
		const secondPassed = yield;
		const thirdPassed = yield;
		const final = yield;
		yield [firstPassed, secondPassed, thirdPassed, final];
	}
	const accumulateGen = accumulateThreeAndReturn()

	const values = ['initialize value, goes nowhere', 'First', 'Second', 'Third'];
	values.forEach((value) => accumulateGen.next(value))
	cl(`Accumulated values: ${accumulateGen.next('Final').value}`)
};
// accumulateValues()
