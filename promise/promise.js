const promise = function (resolvePromise = true) {
  return new Promise(function (resolve, reject) {
    console.log('Doing some job...');
    setTimeout(_ => resolvePromise ? resolve('Job well done') : reject('Job failed'), 2000)
  })
}

promise(false).then(console.log).catch(console.log)

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

valuesArray.reduce((resolved, cur) => resolved.then((value) => addValuePromise(value + cur)), Promise.resolve(0)).then(console.log)
