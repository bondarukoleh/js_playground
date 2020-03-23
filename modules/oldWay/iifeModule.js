const counter = (function () {
  console.log('Starting counter');
  let counter = 0;
  const increase = () => {
    console.log('Increased counter');
    counter++;
  };
  const getCounter = () => {
    console.log('Return counter');
    return counter;
  };

  return {
    increase,
    getCounter
  };
})();

counter.increase();
console.log(counter.getCounter());

// modify iife module
((module) => {
  const closureVar = 'Super hidden';
  const newFeatureModule = () => (
    {
      newFeature: () => console.log(`I'm new module feature. With closure -> ${closureVar}`)
    }
  );

  module.showCurrentCounter = () => {
    console.log(module.getCounter());
  };
  module.subModule = newFeatureModule();

})(counter);

counter.showCurrentCounter();
counter.subModule.newFeature();