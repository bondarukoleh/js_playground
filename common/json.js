/*toJSON - function called when we JSON.stringify some object*/

const o = {
  inJson: 'value',
  nested: {
    notInJson: 'some value',
    toJSON() {
      return 'This will be in nested';
    }
  }
};

// console.log(JSON.stringify(o)); //{"inJson":"value","nested":"This will be in nested"}
// console.log(JSON.stringify(o, null, '-|'));
// {
// -|"inJson": "value",
// -|"nested": "This will be in nested"
// }

const someObj = {
  regularA: 'regularAValue',
  specificA: 'specificAValue',
  numberKey: 1
};
const someObjStringified = JSON.stringify(someObj, (key, value) => {
  return key === "regularA" ? 'NewValue' : value; /* If you change value - everything breaks */
});
console.log(someObjStringified); // {"regularA":"NewValue","specificA":"specificAValue","numberKey":1}
console.log(JSON.stringify(someObj,
  (key, value) => typeof value === 'string' ? undefined : value)); // {numberKey: 1}

// Second argument as an array with keys that will be printed
const dude = {
  name: "Ol",
  surname: "Bond",
  friends: new Set(["Dan", "Pedro", "Mr Gregory"])
};
const dudeStringified = JSON.stringify(dude, ['name', 'surname']);
// console.log(dudeStringified); // {"name":"Ol","surname":"Bond"}

