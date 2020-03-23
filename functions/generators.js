/* We can pass value to generators, and passed value becomes new value of suspended yield,
but there is exception:
We can pass value only to SUSPENDED yield, 
that's why we cannot pass anything to first next, nothing is waiting, no yield is suspended. 
To pass to first yield, we can use just argument when we initialize generator to iterator. 

Generator has 4 states
Suspended start -> Execution -> Suspended yield -> Completed
                       |                | 
                        <---------------    
So the execution is going by this flow:
1. We call generator -> (Suspended start) generator context on the top of the stack, and generators arguments initiated with
passed values, generator returns the iterator with closure on generator context. After return of iterator - generator context
is popped out from stack but doesn't removed, since it has iterator has link on it from closure. 
2. We call iterator.next() -> (Execution) generator context is back in stack, and executing until reaches yield. It return
whole expression from the left of yield, and becomes suspended (Suspended yield) generator context is popped out from stack
but doesn't removed since closure.
3. We pass value to next, iterator.next(value) -> (Execution) suspended yield initiated with the passed value. generator executes
either to next "yield" - witch set the (Suspended yield) state or "return" - witch set the (Completed) state.
4. When .next() called and generator execution doesn't face yield (or return) - generator became (Completed).
*/
const cl = console.log;

const checkPassedValueGenerator = () => {
  function* twoWayGen(value) {
    // value -> is bound to passed argument twoWayGen('INITIAL')
    // in passedThruSecondNext here we can store passed thru next(arg) value
    cl('Inside the generator. Printed only after first .next() called.');
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
  cl('Generator is initiated. Generator arguments is initiated, but not a singe row is executed.');
  // we should not pass anything in first next, since nothing is suspended
  cl(`First return: ${generator.next(`Won't go anywhere`).value}`);
  cl('---------------------------------------------------------');
  cl(`Second return: ${generator.next('PASSED TO 1nd yield').value}`);
  cl('---------------------------------------------------------');
  cl(`Third return: ${generator.next('PASSED TO 2nd yield').value}`); //undefined, 3rd yeild is empty, but stores a
                                                                      // value
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

  const getCurrentPassedGenerator = getCurrentPassed('Initial');
  cl(`Initial passed param: ${getCurrentPassedGenerator.next().value}`);
  cl(`First passed param: ${getCurrentPassedGenerator.next('First Passed').value}`);
  cl(`Second passed param: ${getCurrentPassedGenerator.next('Second Passed').value}`);
  cl(`Third passed param: ${getCurrentPassedGenerator.next('Third Passed').value}`);
};
// returnCurrentValue()

const accumulateValues = () => {
  function* accumulateThreeAndReturn() {
    const firstPassed = yield;
    const secondPassed = yield;
    const thirdPassed = yield;
    const final = yield;
    yield [firstPassed, secondPassed, thirdPassed, final];
  }

  const accumulateGen = accumulateThreeAndReturn();

  const values = ['initialize value, goes nowhere', 'First', 'Second', 'Third'];
  values.forEach((value) => accumulateGen.next(value));
  cl(`Accumulated values: ${accumulateGen.next('Final').value}`);
};
// accumulateValues()

const checkReturn = () => {
  function* checkYieldAfterReturn() {
    yield 'start';
    // return 'final'; /*return sets generator in "Completed state". No matter how much yield is below.*/
    const passed = yield 'Last yield'; /*last yield doesn't set generator in "Completed state", we can call next once more*/
    cl('We can do some job below last yield. Printed after 3rd .next() called.');
    cl(passed);
  }

  const iterator = checkYieldAfterReturn();
  cl(iterator.next().value); //start
  // cl(iterator.next()) //{ value: 'final', done: true }
  cl(iterator.next().value); //Last yield
  cl(iterator.next('Passed Arg')); // { value: undefined, done: true }
};
checkReturn();

const checkThrow = () => {
  function* checkYieldAfterThrow() {
    try {
      yield 'start';
      yield 'Last yield'; /*last yield doesn't set generator in "Completed state", we can call next once more*/
    } catch (e) {
      cl(`Error is thrown from iterator, caught on generator side "${e}"`);
      throw 'Thrown final'; /*throw sets generator in "Completed state". Throw from generator should be caught on caller side*/
    }
  }

  const iterator = checkYieldAfterThrow();
  try {
    cl(iterator.next().value); //start
    /* If there no try/catch in generator, error will be yielded back here, no matter that we throw it from here */
    cl(iterator.throw('Thrown Arg')); //  { value: undefined, done: true }
  } catch (e) {
    cl(`Error is thrown from generator, caught on iterator side "${e}"`);
    cl(iterator.next()); // { value: undefined, done: true }
  }
};
// checkThrow()