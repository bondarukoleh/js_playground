/*
Random generates a pseudo random value from 0 to 1 inclusive of 0, but not 1
Math.random() = 0.7418141085356575
*/

const printResult = (result, ...range) => {
  console.log(`From range ${range} result is: ${result}`);
};

const findBiggestTrio = (map) => {
  return [...map]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .reduce((acc, curr, index) => {
      acc.push({
        randomNumber: curr[0],
        repeated: curr[1]
      });
      return acc;
    }, []);
};

const checkRandom = (func, ...args) => {
  const randomMap = new Map();
  for (let i = 0; i < 100; i++) {
    const result = func(...args);
    let value = randomMap.get(result);
    if (value) {
      randomMap.set(result, ++value);
    } else {
      randomMap.set(result, 1);
    }
  }
  console.log(randomMap);

  if ([...randomMap].length > 2) {
    console.log('Biggest trio: %j', findBiggestTrio(randomMap));
  }
};

const randomFrom0ToInclude = () => {
  const getRandomResult = (max) => Math.random() * max;
  // Math.random() return from 0 to 0.99999, so we multiply it on max, and we'll got 0 or 4.99999 maximum (included)
  printResult(getRandomResult(5), 5);
};
// randomFrom0To()

const randomFromRange = () => {
  const getRandomResult = (min, max) => min + Math.random() * (max - min);
  // Math.random() return from 0 to 0.99999, so we multiply it on max - min
  // and get the result that is a random difference of max and min, 0.12321334 to 2.9132132,
  //it will be maximum 2.999999 or 0. And adding it to min, since it will be maximum 10 (included)
  printResult(getRandomResult(7, 10), 7, 10);
};
// randomFromRange()

const randomIntegerRangeWithRound = () => {
  const getRandomIntResult = (min, max) => Math.round(min + Math.random() * (max - min));
  // Math.random() return from 0 to 0.99999, so we multiply it on max - min
  // and get the result that is a random difference of max and min, in this case 0.000001 to 1.999999,
  //it will be maximum 2 or 0. And adding it to min, since it will be maximum 3 (included)
  // checkRandom(getRandomIntResult, 1, 3) //Map { 2 => 52, 3 => 27, 1 => 21 }
  /*
  But this function is working not correctly.
  Return value form (min + Math.random() * (max - min)) minimum 1.000000 and maximum 2.999999,
  but since we round it:
  1 - become numbers from 1 ... 1.49999
  2 - become numbers from 1.5 ... 2.49999
  3 - become numbers from 2.5 ... 2.99999

  2 - is the most case.
  So we need to move these ranges manually.
  We will subtract 0.5 from min to make range for 1 more wide
  And return value form (min - 0.5 + Math.random() * (max - min)) minimum 0.500000 and maximum 2.99999,
  which give us range for 1 from 0.50000 ... 1.49999.
  */
  const getRandomIntResultDraft = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min));
  // checkRandom(getRandomIntResultDraft, 1, 3) //Map { 1 => 50, 2 => 50 }
  /*
  As you can see we didn't get any 3th, because we subtracted 0.5 from min,
  and stole 0.5 from 2.99999 range that bring us to max result of 2.499999
  We need to fix it. By adding 0.5 to max/min difference - we'll return to the same result
  of first realization since we are using round here - we need to add 1 to max
  because round(3.499999) - will give us 3.
  */
  const getRandomIntResultFinal = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1));
  // checkRandom(getRandomIntResultFinal, 1, 3) //Map { 2 => 36, 1 => 33, 3 => 31 }
  // Super true random
};
randomIntegerRangeWithRound();


const randomRangeWithFloor = () => {
  const realizationDraft = (min, max) => Math.floor(min + Math.random() * (max - min));
  // checkRandom(realizationDraft, 1, 3) //Map { 2 => 49, 1 => 51 }
  /*
  as we know min + Math.random() * (max - min) will return from 1 to 2.999999
  floor will make from 2.99999 -> 2, so we out of 3th again.
  So we need to add 1 to max/min difference. Gives ranges for floor
  1 -> from 1 ... 1.999999
  2 -> from 2 ... 2.999999
  3 -> from 3 ... 3.999999
  */
  const realizationFinal = (min, max) => Math.floor(min + Math.random() * (max - min + 1));
  checkRandom(realizationFinal, 1, 3); //Map { 2 => 32, 1 => 32, 3 => 36 }
};
// randomRangeWithFloor()