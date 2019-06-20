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
urls.reduce((result, curUrl) => {
  return result.then(_ => {
    return getUrl(curUrl)
  })
}, Promise.resolve())

let valuesArray = [1, 2, 3]
const addValuePromise = function(value){
  return new Promise(function(res){
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
  }, Promise.resolve(0))
  console.log(result);
}
// asyncReduce()

