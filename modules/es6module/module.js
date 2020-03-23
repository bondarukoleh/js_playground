const name = 'Bob';
export const message = 'This is exported with separately from function';

export function sayHi() {
  console.log(`${message} to ${name}`);
}