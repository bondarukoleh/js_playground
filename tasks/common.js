// typeof
const checkTypeof = _ => {
  const values = new Map([
    ['nan', NaN],
    ['undefined', undefined],
    ['null', null],
    ['number', 1],
    ['string', 'adc'],
    ['boolean', true],
    ['function', function () {
    }],
    ['object', {}],
    ['array', []],
  ]);

  for (const [key, value] of values) {
    console.log(`typeof ${key} === "object" && ${key} !== null && !Arrar.isArray(${key}) && ${key}.constructor.name === Object: \
     "${typeof value === 'object' && value !== null && !Array.isArray(value) && value.constructor.name === 'Object'}"`);
  }

  console.log(typeof NaN);
  console.log(Number.isNaN(NaN));
  const a = () => {
  };
  if (typeof null === 'object' && typeof a === 'function') {
    console.log('aha');
  }
};
// checkTypeof()

const reverseTrick = _ => {
  const arr1 = "john".split('');
  const arr2 = arr1.reverse(); // reverse returns a referense to initial array
  const arr3 = "jones".split('');
  arr2.push(arr3);
  console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1));
  console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1));
};
// reverseTrick()

function undefinedCheck() {
  // if some smart ass will set undefined = true; We can avoid fail on this with void 0;
  // void operator, takes one operand to its right-hand side and will always evaluate to undefined
  let undefVar;
  let undefined = true;
  if (undefVar === undefined) {
    // won't run since undefined is true now.
    console.log('Logic works not as you expected')
  }
  if (undefVar === void 0) {
    console.log(`This is what you should see`)
  }
  if (undefVar == null) { // not strict check will pass for both
    console.log('Value is either null or undefined');
  }
}
// undefinedCheck()

function breakLoop() {
  function breakWhile() {
    let i = 0;
    do {
      i++;
      if (i === 3) {
        console.log('Breaking...')
        break;
      }
      console.log(`Iterator: ${i}`);
    } while (i < 5)
  }
  // breakWhile()
}
breakLoop()