const arr = ['begining', 'midle', 'end'];

console.log(arr.push('pushed to end')) // 4
console.log(arr); //[ 'begining', 'midle', 'end', 'pushed to end' ]
console.log(arr.shift()); // 'begining'
console.log(arr); // [ 'midle', 'end', 'pushed to end' ]
console.log(arr.unshift('new begining')); // 4
console.log(arr); // [ 'new begining', 'midle', 'end', 'pushed to end' ]
console.log(arr.splice(0, 0, 'splice begining')); // []
console.log(arr); //[ 'splice begining', 'new begining', 'midle', 'end', 'pushed to end' ]