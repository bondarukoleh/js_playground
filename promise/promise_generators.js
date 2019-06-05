const promise = (value) => new Promise((resolve) => setTimeout(() => resolve(value), 1000));

const simpleUsage = () => {
  function* generatePromise() {
    yield promise('value')
  };

  const generator = generatePromise();
  generator.next().value.then((res) => { console.log(res) });
};
// simpleUsage()

const addValuesAsync = () => {
  const values = [1, 2, 3]
  function* generatePromise(valuesToUse) {
    const firstResult = yield promise(valuesToUse[0])
    const secondResult = yield promise(valuesToUse[1] + firstResult)
    const lastResult = yield promise(valuesToUse[2] + secondResult)
    return lastResult
  }

  function addValuesFromIterator(iterator) {
    function handlePromise({ value, done }) {
      if (done) {
        console.log(`Work done, result is ${value}`);
        console.log('Thank god we have async/await.');
        return value;
      }
      if (value instanceof Promise) {
        value
          .then((resolvedValue) => {
            console.log(`We've got: ${resolvedValue}`);
            handlePromise(iterator.next(resolvedValue))
          })
          .catch((err) => iterator.throw(err))
      } else {
        throw Error('Something goes wrong. Check the code.')
      }
    }
    return handlePromise(iterator.next())
  }

  const iterator = generatePromise(values)
  addValuesFromIterator(iterator)
}
addValuesAsync()