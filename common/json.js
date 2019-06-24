/*toJSON - function called when we JSON.stringify some object*/

const o = {
  inJson: 'value',
  nested: {
    notInJson: 'some value',
    toJSON() {
      return 'This will be in nested'
    }
  }
}

console.log(JSON.stringify(o)); //{"inJson":"value","nested":"This will be in nested"}
console.log(JSON.stringify(o, null, '-|'));
  // {
  // -|"inJson": "value",
  // -|"nested": "This will be in nested"
  // }
