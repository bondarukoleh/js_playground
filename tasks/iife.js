const f1 = _ => {
  (function(){
    const a = 'value from function scope';
    (function () {
      console.log(a);
    })()
  }())
}

const f2 = _ => {
  const a = 'value from global';
  (() => console.log('printing from arrow function', a))();
  (function () {console.log(a);})();
  
  (function(){
    var b = c = 3;
  })();
  // same as - var b = c, c = 3. Since c is defined without var - it's became global and stays after iife fired
  console.log("c defined? " + (typeof c !== 'undefined'));
  console.log("b defined? " + (typeof b !== 'undefined'));
}

const f3 = _ => {
  const object = {
    v: 'value',
    iife(){
      (() => console.log(this.v))(); // value
      (function(){ console.log(this.v)})(); // undefined
    }
  }
  object.iife()
}
// f3()
const f4 = _ => {
  let arr = [];
  for (var i = 0; i < 5; i++) {
    // arr.push({showYourNumber: function(){console.log(i)}}) -> will show 5 always
    arr.push({showYourNumber: (function(i){return _ => console.log(i)})(i)})
    arr.push({showYourNumber: function(i){console.log(i)}.bind(this, i)})
  }
  arr[2].showYourNumber();
}
// f4()