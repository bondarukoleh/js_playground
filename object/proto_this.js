const cl = console.log;
const o = {a: 'object'};
o.__proto__.a = 'proto';
o.__proto__.cla = function () {
  cl(this.a);
};

o.cla(); // object
o.__proto__.cla(); // proto
