const defaultValueInArr = () => {
  const arr = [1, undefined, 2];
  console.log(arr.map((val = 'was undefined') => val)); //[ 1, 'was undefined', 2 ]

  const secondLayerArray = [['a', 'b'], ['c', 'd']];
  secondLayerArray.forEach(([first, second]) => console.log(first, second)); //a b c d

  let map0 = new Map([[1, 'a'], [2, 'b'], [3, 'c'],]);
  console.log(map0.get(3));
  let map1 = new Map([...map0].map(([key, value]) => [key * 2/* key modification */, `modified value - ${value}`]));
  console.log(map1);
};
// defaultValueInArr()

const defaulValueForObject = ({a = 'default A', b = 'default B'} = {}) => {
  console.log(a, b);
};
// defaulValueForObject(); /*default A default B*/
// defaulValueForObject({b: 'B from Object'}); /*default A B from Object*/

const throwError = _ => {
  throw new Error('Parameter not provided');
};
const requiredParameterFunc = (needeParameter = throwError()) => console.log(needeParameter);
// requiredParameterFunc() /* Will cost an error */


// The spread operator lets you convert any iterable object to an Array
console.log(Math.max(1, 2, ...[4, 5], 6));
const map = new Map([[1, 'a'], [2, 'b']]);
console.log([...map]);

function dynamicPropertyExtraction() {
  /* Be aware! That it is not deletion, it is creation a new object, with removed getters and setters!!! */
  const o = {user: 1, pass: 2};
  const extractThe = (propertyToDelete) => ({[propertyToDelete]: _, ...rest}) => rest;

  const deleteUserProperty = extractThe('user');
  console.log(deleteUserProperty(o)); //{ pass: 2 }
}
// dynamicPropertyDeletion();

function changePropertyOrder() {
  const o = {second: 2, first: 1};
  const reorder = (o) => ({first: undefined, second: undefined, ...o});

  console.log(reorder(o)); //{ first: 1, second: 2 }
}
// changePropertyOrder();

function setDefaults() {
  const o = {second: 2, first: 1};
  const o2 = {second: 2, first: 1, description: 'Set description.'};
  const setDefaultDescription = ({description = 'Default description.', ...rest}) => ({...rest, description});

  console.log(setDefaultDescription(o)); //{ second: 2, first: 1, description: 'Default description.' }
  console.log(setDefaultDescription(o2)); //{ second: 2, first: 1, description: 'Set description.' }
}
// setDefaults();

function renameProperties() {
  const o = {USER_NAME: 2, pass: 1};
  const renameNameProp = ({USER_NAME, ...rest}) => ({user: USER_NAME, ...rest});

  console.log(renameNameProp(o)); //{ user: 2, pass: 1 }
}
// renameProperties();

function addPropsWithCondition() {
  const o = {user: 2, pass: 1};
  const addPropsIfPassed = (o, props) => ({
    ...o,
    ...(props && {...props})
  });

  console.log(addPropsIfPassed(o, {desc: 'abc', additionProp: 'aaa'}));
  // { user: 2, pass: 1, desc: 'abc', additionProp: 'aaa' }
}
// addPropsWithCondition();