// The import() operator returns Promises. It's dynamic also, you can use it conditional.
const { someFunctionality } = await import('./module.mjs')

// You have the same as in es6 modules,
import * as namespaceImport from './module.mjs'
import {someFunctionality as someRenaming} from './module.mjs'

someFunctionality()