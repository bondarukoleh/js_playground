const thenThing = _ => {
  const promise = function(value, time = 1000){
    return new Promise(function(resolve, reject){
      setTimeout(resolve, time, value)
    })
  }

  promise(5, 500)
  .then((value) => {
    console.log(value);
    return 'returned from then'
  })
  .then((value) => {
    console.log(value);
    throw new Error('Error from then')
  })
  .then(_ => {},(err) => {
    console.log(err.message);
    return 'value after error'
  })
  .then(val => {
    console.log(val);
  })
  .catch(console.log)
}

const promiseSequense = _ => {
  const promise = function(value, time = 1000){
    return new Promise(function(resolve, reject){
      setTimeout(() => {
        console.log(`resolving ${value}`);
        resolve(value)
      }, time)
    })
  };

  [1, 2, 3].reduce((acc, cur) => acc.then(val => promise(val + cur)), Promise.resolve(0))
}
promiseSequense()