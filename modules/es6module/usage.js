import * as module from './module';
import {message, sayHi} from './module2';
import DefaultExported, {someFunction} from './defaultExport';
import * as defaultExportModule from './defaultExport';

console.log(module.message);
console.log(message);
console.log(new DefaultExported().someMethod());
console.log(someFunction());
console.log(defaultExportModule); // { default: [Function: DefaultExported], someFunction: [Function: someFunction] }
console.log(new defaultExportModule.default().someMethod()); // From export default class function


import {variable as importedVariable} from './changesWithTimeModule';
import * as module1 from './changesWithTimeModule';
import { variable } from './changesWithTimeModule';

const {variable: createdVar} = module1;

setTimeout(() => {
  console.log(importedVariable); // "changed"
  console.log(module1.variable); // "changed"
  console.log(variable); // "changed"
  console.log(createdVar); // "initial"
}, 1000);


