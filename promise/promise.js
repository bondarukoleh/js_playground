const promise = function (resolvePromise = true) {
  return new Promise(function (resolve, reject) {
    console.log('Doing some job...');
    setTimeout(_ => resolvePromise ? resolve('Job well done') : reject('Job failed'), 2000)
  })
}

promise(false).then(console.log).catch(console.log)