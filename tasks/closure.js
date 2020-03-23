const counter = () => {
  const getCounter = function () {
    let currentCounter = 0;
    return {
      increment() {
        currentCounter++;
      },
      decrement() {
        currentCounter--;
      },
      showCounter() {
        console.log(currentCounter);
      },
      refresh() {
        currentCounter = 0;
      }
    };
  };

  const counter1 = getCounter();
  const counter2 = getCounter();

  counter1.increment();
  counter1.increment();
  counter2.increment();

  counter1.showCounter();
  counter2.showCounter();
};
// counter()

const a = (i) => {
  console.log('binded from arrow:', i);
};
for (var i = 0; i < 5; i++) {
  setTimeout(function (i) {
    console.log('-----------------------------------------------');
    console.log('passed thru setTimeout parameter:', i);
  }, i * 1000, i);
  setTimeout(function (i) {
    console.log('binded:', i);
  }.bind(this, i), i * 1000);
  setTimeout((function (i) {
    return () => console.log('closured1:', i);
  })(i), i * 1000);
  ((i) => {
    setTimeout(function () {
      console.log('closured2:', i);
    }, i * 1000);
  })(i);
  // and let instead of var of course
}