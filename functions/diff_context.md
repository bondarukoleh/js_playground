**Two types of context:**
1. Execution context
2. Function context

**Execution context**: Stack trace (as execution context stack or call stack) is an order of execution contexts. \
  a) Global execution context, only one. Where code is invoked on the first place \
  b) Function execution context. What function is invoked, in what order. (don't mess with function context, "this") \
When func a call func b, a function execution context paused, and function execution context of b is pushed onto stack.

**Function context** - In context of what object this function is running.

**Lexical Environment (Scope, block of code)** - is an internal JavaScript engine construct used to keep track of the 
mapping from identifiers to specific variables. Lexical environments are an internal implementation of the JavaScript
scoping mechanism, and people often colloquially refer to them as scopes. \
It created each time, function (or block) is invoked.

Each function has [[Environment]] and [[Outer]] properties in Lexical scope. When variable needs to be resolved, first
it will be searched in [[Environment]], inside the function scope, and then it will looked in [[Outer]] link to outer
scope.
  
(sic!) [[Outer]] link of the new-called function lexical environment, the JavaScript engine puts the [[Environment]] of
function where now-called function was CREATED!

In V8 for sure - there are 4 types of scope.
1. Global scope. All variables that declared in global scope of the file, or window in browser.
2. Local (function scope, [[environment]]) - all variables that declared inside function.
3. Block scope. As far as I get - also has [[environment]] with it's own variables and [[outer]] link to outer scope
where it is created.
4. Closure. Object that creates when function A return function B. B has it's regular [[environment]] and 
[[scope]] === A [[environment]] BUT (sic!) in this closure object - there are only variables that B is using from
A [[environment]], not the same object, but improved, cut down to variables that BUT needs for it's working.

