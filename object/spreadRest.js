const defaultValueInArr = () => {
  const arr = [1, undefined, 2];
  console.log(arr.map((val = 'was undefined') => val)); //[ 1, 'was undefined', 2 ]

  const secondLayerArray = [['a', 'b'], ['c', 'd']];
  secondLayerArray.forEach(([first, second]) => console.log(first, second)); //a b c d

  let map0 = new Map([[1,'a'],[2,'b'],[3,'c'],]);
  console.log(map0.get(3));
  let map1= new Map([...map0].map(([key, value])=>[key * 2/* key modification */,`modified value - ${value}`]));
  console.log(map1);
}
// defaultValueInArr()

const defaulValueForObject = ({a = 'default A', b = 'default B'} = {}) => {
  console.log(a, b);
}
// defaulValueForObject(); /*default A default B*/
// defaulValueForObject({b: 'B from Object'}); /*default A B from Object*/

const throwError = _ => {throw new Error('Parameter not provided')}
const requiredParameterFunc = (needeParameter = throwError()) => console.log(needeParameter);
// requiredParameterFunc() /* Will cost an error */


// The spread operator lets you convert any iterable object to an Array
console.log(Math.max(1, 2, ...[4, 5], 6));
const map = new Map([[1, 'a'], [2, 'b']])
console.log([...map]);