const cl = console.log;

function funcGetSet() {
  // old way
  let innerProperty = 'default value';

  function A() {
    Object.defineProperties(this, {
      innerProp: {
        get: () => {
          cl(`some log/check/action before returning "${innerProperty}"`);
          return innerProperty;
        },
        set: (value) => {
          cl(`some log/check/action before setting "${innerProperty}" to "${value}"`);
          innerProperty = value;
        }
      }
    });
  }

  const a = new A();
  a.innerProp = 'new value';
  cl(a.innerProp);
}

// funcGetSet();

function objGetSet() {
  // in object
  let innerProp = 'default object value';
  const obj = {
    get innerProp() {
      cl(`some log/check/action before returning "${innerProp}"`);
      return innerProp;
    },
    set innerProp(value) {
      cl(`some log/check/action before setting "${innerProp}" to "${value}"`);
      innerProp = value;
    }
  };
  obj.innerProp = 'new value for obj';
  cl(obj.innerProp);
}

// objGetSet();

function classGetSet() {
  let privateValue = 'private';

  class A {
    get privateValue() {
      cl(`some log/check/action before returning "${privateValue}"`);
      return privateValue;
    }

    set privateValue(value) {
      cl(`some log/check/action before setting "${privateValue}" to "${value}"`);
      privateValue = value;
    }

    get someAsyncValue() {
      return (async () => {
        return new Promise((res) => setTimeout(res, 1000, 'value got async'));
      })();
    }
  }

  const a = new A();
  a.privateValue = 'new value to class';
  cl(a.privateValue);
  a.someAsyncValue.then(cl);
}

// classGetSet();