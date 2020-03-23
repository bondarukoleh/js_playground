const cl = console.log;
const o = {outer1: {innerKey: 'innerValue'}, outer2: 'outerValue'};
for (let key in o) {
  cl(key); // outer1, outer2
}

cl('innerKey' in a); // false
cl('outer2' in a); //true
