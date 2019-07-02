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


