/* Simple merge and clone objects, no protection from circular references. */
const assert = require('assert');

/* We cannot change objects that we need to clone and merge */
const first = Object.freeze({
  firstLayerProperty1: 'firstLayerProperty1',
  fistLayerObject1: {
    secondLayerProperty1: 'secondLayerProperty1',
    secondLayerObject1: {
      thirdLayerProperty1: 'thirdLayerProperty1',
      thirdLayerProperty2: 'thirdLayerProperty2'
    }
  },
  fistLayerObject2: {
    secondLayerProperty2: 'secondLayerProperty2',
    secondLayerObject2: {
      thirdLayerProperty2: 'thirdLayerProperty2',
    }
  }
});

const second = Object.freeze({
  firstLayerProperty1: 'firstLayerProperty1',
  fistLayerObject1: {
    secondLayerProperty1: 'secondLayerProperty1 CHANGED',
    secondLayerObject1: {
      thirdLayerProperty2: 'thirdLayerProperty2 CHANGED',
      thirdLayerProperty3: 'ADDED'
    }
  },
  fistLayerObject2: {
    secondLayerProperty2: 'secondLayerProperty2 CHANGED',
    secondLayerObject2: {
      thirdLayerProperty3: 'ADDED',
    }
  }
});

const resultShouldBe = {
  firstLayerProperty1: 'firstLayerProperty1',
  fistLayerObject1: {
    secondLayerProperty1: 'secondLayerProperty1 CHANGED',
    secondLayerObject1: {
      thirdLayerProperty1: 'thirdLayerProperty1',
      thirdLayerProperty2: 'thirdLayerProperty2 CHANGED',
      thirdLayerProperty3: 'ADDED'
    }
  },
  fistLayerObject2: {
    secondLayerProperty2: 'secondLayerProperty2 CHANGED',
    secondLayerObject2: {
      thirdLayerProperty2: 'thirdLayerProperty2',
      thirdLayerProperty3: 'ADDED'
    }
  }
};

function deepCloneAndMerge(obj1, obj2) {
  function isObject(o) {
    return o && typeof o === 'object' && !Array.isArray(o);
  }

  function clone(source) {
    const cloned = {};
    if (!isObject(source)) {
      return source;
    }

    for (const key in source) {
      cloned[key] = isObject(source[key]) ? clone(source[key]) : source[key];
    }
    return cloned;
  }

  function merge(object1, object2) {
    const cloned = clone(object1);

    for (const key in object2) {
      cloned[key] = isObject(cloned[key])
        ? merge(cloned[key], object2[key])
        : isObject(object2[key])
          ? clone(object2[key])
          : object2[key];
    }

    return cloned;
  }

  return merge(obj1, obj2);
}

assert.deepStrictEqual(deepCloneAndMerge(first, second), resultShouldBe, 'Objects not merged properly.');