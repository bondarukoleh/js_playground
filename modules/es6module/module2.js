const name = 'Bob';
const message = 'This is exported in object with function';

function sayHi() {
  console.log(`${message} to ${name}`);
}

export {message, sayHi};