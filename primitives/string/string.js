const substringFunc = _ => {
  const a = 'some string';
  console.log(a.substring(1, 5)); //ome
};
// substringFunc()

const charAtFunc = _ => {
  const a = 'some string';
  console.log(a.charAt(1)); //o
  console.log(a.charAt(20)); // ''
  console.log(a[20]); // undefined
  console.log(a.repeat(2)); //'some stringsome string'
};
// charAtFunc()

stringLoop = () => {
  const str = 'somestring';
  for (const s of str) {
    console.log(s);
  }
  Array.prototype.forEach.call(str, (s, i, arr) =>  console.log(s))
  console.log(Array.prototype.reduceRight.call(str, (acc, cur) => {acc += cur; return acc},''))
  console.log(str.split('').reverse().join(''))
};
// stringLoop();

/*
* Two types of strings Objects and primitives
*/

const stringTypes = () => {
  console.log(typeof ''); // string
  console.log(typeof new String('')); // object
}
// stringTypes()


/*
All of the string methods you are familiar with are part of the String object, not the primitive.
When you call a method on a string primitive, JavaScript 'auto-boxes', or wraps, the primitive in a
String object, and calls the method on that object instead.
*/

const nestedTemplates = () => {
  const something = 'value';
  const something2 = 'nested value';

  console.log(`You can have nested values "${something + ` and "${something2}"`}"`);
}
// nestedTemplates()

/*
Tagged Templates.
This allows us to write a function that accepts the string values from the Template Literal,
and all of the expressions used in the template.
You cannot use tags or String.raw with regular strings.
*/

const taggedTemplates = () => {
  const userInputsName = 'John Fuck';
  const userInputsSurName = 'DouShit';
  const userInputsMiddleName = 'Donovan';

  const censor = (knownStrings, ...inputs) => {
    console.log(knownStrings) // [ 'Hello! Name is - "', '", surname - "', '", middlename - "', '"' ]
    console.log(inputs) // [ 'John Fuck', 'DouShit', 'Donovan' ]

    const censoredValues = inputs.map(val => {
      return val.split(/fuck/i).join('').replaceAll(/shit/ig, '*').trim();
    })

    let censoredString = censoredValues.reduce((acc, val, i) => {
      return `${acc}${knownStrings[i]}${val}`
    }, '');

    if (censoredValues.length <= knownStrings.length) {
      censoredString += knownStrings[knownStrings.length - 1];
    }
    return censoredString;
  }

  const greetingWeShow = censor`Hello! Name is - "${userInputsName}", surname - "${userInputsSurName}", middlename - "${userInputsMiddleName}"`;
  console.log(greetingWeShow);
}
// taggedTemplates()

/*
String.raw is a pre-defined tag function.
It allows you to access the string without interpreting any backslash escape sequences.
*/
const rawString = () => {
  console.log(String.raw`First line \n Second line`) // First line \n Second line

  // With string.raw, no need for escape sequences
  const path = String.raw`C:\Program Files\file.json`
  console.log(path) // C:\Program Files\file.json
}
// rawString()

const splitString = () => {
  console.log("👋!".split("")) // ["�", "�", "!"]
  console.log([..."👋!"]) // ["👋", "!"]
}
// splitString()

function emojiLength() {
  console.log(`🥳`.length) // 2
  console.log(`👯‍♀`.length) // 4
}
// emojiLength()


function trickWithCasting() {
  const obj = {
    name: 'Forty two',
    value: 42,
    toString() {
      return this.name;
    },
    valueOf() {
      return this.value;
    }
  }

  console.log(`${obj}`); // Forty two
  console.log('' + obj); // 42
}

// trickWithCasting()
