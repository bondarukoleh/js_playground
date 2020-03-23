(function a1() {
  console.log('Works 1');
})();

(function a2() {
  console.log('Works 2');
}());

// function a2(){
//   console.log('Works 2')
// }() //doesn't work with regular function

// const a3 = () => {console.log('Works 3')}() // doesn't work with arrow function
const a3 = function () {
  console.log('Works 3');
}(); // but works with regular function
const a4 = (() => {
  console.log('Works 4');
})();
// const a5 = (() => {console.log('Works 5')}()) //doesn't work with arrow function
const a5 = (function () {
  console.log('Works 5');
}()); // but works with regular function
