const cl = console.log;
const promise = function (resolvePromise = true) {
  return new Promise(function (resolve, reject) {
    console.log('Doing some job...');
    setTimeout(_ => resolvePromise ? resolve('Job well done') : reject('Job failed'), 2000)
  })
}

// promise(false).then(console.log).catch(console.log)

const urls = ['first', 'second', 'third']
const getUrl = function (url) {
  return new Promise(function (res, rej) {
    setTimeout(() => {
      console.log(`Getting ${url}`);
      res()
    }, 1000)
  })
}
// urls.reduce((result, curUrl) => {
//   return result.then(_ => {
//     return getUrl(curUrl)
//   })
// }, Promise.resolve())

let valuesArray = [1, 2, 3]
const addValuePromise = function (value) {
  return new Promise(function (res) {
    setTimeout(() => {
      console.log(`returning ${value}`)
      res(value)
    }, 1000)
  })
}

// valuesArray.reduce((resolved, cur) => resolved.then((value) => addValuePromise(value + cur)), Promise.resolve(0)).then(console.log)

/*
Reduce with async
If we set the callback async - it will always return an promise to acc.
We need to resolve acc each time.
*/
const asyncReduce = async () => {
  const values = [1, 2, 3];
  const result = await values.reduce(async (acc, val) => {
    const previousResult = await acc;
    const newValue = addValuePromise(previousResult + val)
    acc = newValue
    return acc;
    //}, Promise.resolve(0)) -> could be like this, but since acc is a promise - we don't need this 
  }, 0)
  console.log(result);
}
// asyncReduce()

const asyncMap = async () => {
  const values = [1, 2, 3];
  const result = await values.map(async (val) => {
    const r = await addValuePromise(val + 1)
    return r
  })
  console.log('Done', result);
}
// asyncMap()

function tryToCatch() {
  function promise() {
    // throw new Error('haha') // -> this will be caught by catch
    return new Promise(function (res, rej) {
      // throw new Error('haha') //-> this will set promise to rejected and will be caught by rej 
      setTimeout(() => {
        throw new Error('haha') //-> error isn't caught by reject resolver because we didn't call rej,
        // and catch statement - because error is thrown asynchronously but catch is synchronous.
        console.log(`Getting ${url}`);
        res()
      }, 500)
    })
  }

  try {
    promise().then(res => {
      cl('resolved ', res)
    }, rej => {
      cl('rejected ', rej)
    })
  } catch (e) {
    cl('in catch')
    cl(e)
  }
}
// tryToCatch()

/* return / await in async function - it's just a matter of where you want to wait for promise
to be resolved */
async function func() {
  const p = (flag, t, ids) => new Promise((res, rej) => {
    setTimeout(() => {
      if (flag) {
        res({ flag, ids })
      } else {
        rej({ flag, ids })
      }
    }, t)
  })
  /* return p(false, 1000, '1') && sleep(true, 5000, '2') // -> in this situation promise always will 
  be resolved, because p(false, 1000, '1') -> it's just a promise that won't go anywhere, since 
  call to p will return Promise{pending} -> it will be true, and we will return another Promise{pending}
  that goes after && operator.

  return await p(false, 1000, '1') -> will wait for this promise to be resolved/rejected to some value, 
  and return this value, but since we in async function - we wrap everything in Promise - and we return
  another promise with this value. So it's not a big sense to return await like this.

  But when we want to compute some statement like && -> it has sense. Because we need to wait for first
  promise to resolved/rejected and than depend on result - we can return result of first promise, 
  or return second promise to be resolved on called side.
  */
  return await p(false, 1000, 1) && /*await here is always not necessary*/ p(true, 2000, 2);
}

async function checkReturnFromAsync() {
  try {
    const value = await func()
    console.log('RESOLVED', value)
  } catch (e) {
    console.log('REJECTED', e)
  }
}
checkReturnFromAsync()
