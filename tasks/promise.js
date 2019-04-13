const thenThing = _ => {
  const promise = function (value, time = 1000) {
    return new Promise(function (resolve, reject) {
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
    .then(_ => { }, (err) => {
      console.log(err.message);
      return 'value after error'
    })
    .then(val => {
      console.log(val);
    })
    .catch(console.log)
}

const promiseSequense = _ => {
  const useValueOfPreviousPromiseInNextOne = _ => {
    const firePromise = function (value, time = 1000) {
      return new Promise(function (resolve, reject) {
        setTimeout(() => {
          console.log(`resolving ${value}`);
          resolve(value)
        }, time)
      })
    };

    [1, 2, 3].reduce((result, cur) => result.then((value) => firePromise(value + cur)), Promise.resolve(0))
  }
  useValueOfPreviousPromiseInNextOne()
  
  const resolvePromiseOnebyAnother = _ => {
    const getPromise = () => new Promise(function (resolve, reject) {
      setTimeout(() => { console.log(`resolving some promise`); resolve() }, 1000)
    })
    const arrOfPromises = [getPromise, getPromise, getPromise]

    // via forEach
    let result = Promise.resolve();
    arrOfPromises.forEach((currentPromise) => {
      result = result.then(currentPromise)
    })

    // via reduce
    arrOfPromises.reduce((acc, cur) => acc.then(cur), Promise.resolve())
  }
  resolvePromiseOnebyAnother()
}
promiseSequense()