### Control flow

Control flow refers to the order in which expressions and statements (and entire blocks of code) will run. Programming
is, in part, the art of controlling flow. By writing code, we are specifying where control resides at any single moment.

### Imperative versus declarative programming

Imperative programming concerns itself with **how**, means step by stem implementation of something is accomplished,
while declarative programming concerns itself with **what**, means declaration of abstractions over implementation
details, we want accomplished.

```js
/* Imperative (mostly) */
function getUnpaidInvoices(invoiceProvider) {
  const unpaidInvoices = [];
  const invoices = invoiceProvider.getInvoices();
  for (var i = 0; i < invoices.length; i++) {
    if (!invoices[i].isPaid) {
      unpaidInvoices.push(invoices[i]);
    }
  }
  return unpaidInvoices;
}

/* Declarative */
function getUnpaidInvoices(invoiceProvider) {
  return invoiceProvider.getInvoices().filter(invoice => {
    return !invoice.isPaid;
  });
}
```

It's important to see that both declarative and imperative approaches are not completely distinct (diff). They are at
either ends of one spectrum. On the declarative side of the spectrum, you are operating at a higher level of
abstraction, and are hence not exposed to the implementation details that you would be without such abstraction. On the
imperative side of the spectrum, you are operating at a lower level of abstraction.

### The movement of control

In JavaScript, there are several ways that control can be moved from one piece of code to another. Generally, code will
be evaluated from left-to-right and top-to-bottom until it reaches any of the following situations:

- Invoking (invocation of a function by fn(), fn`` or new fn())
- Returning (returning from a function via either implicit or explicit return)
- Yielding (yielding from a generator via yield)
- Breaking (breaking from a loop or switch via break)
- Continuing (continuing an iteration via continue)
- Throwing (throwing an exception via throw)

A function will return control to you in the following ways:

- By returning (implicitly or via an explicit return statement)
- By throwing (implicitly due to SyntaxError, TypeError, and so on or via an explicit throw statement)
- By yielding (in the case of a generator)

Returning is a shift of control from a function to its caller. It is achieved either via an explicit return statement
within the function itself or implicitly when the function runs to completion.

Breaking is a shift of control from within the current for, while, switch, or labeled statement to the code following
the statement. It effectively terminates the statement, preventing any following code from being executed.

Continuing is a shift of control from the current statement to the potential start of the next iteration. It is achieved
via a continue statement. \ The continue statement is valid in all iteration constructs,
including `for, while, do...while, for...in, and for...of`

Similar to the break statement, to the right side of the continue keyword can optionally be a label that indicates which
iteration construct should be continued. If you don't supply it, then JavaScript will assume you are referring to the
current iteration construct.

Throwing is a shift of control from the current statement to the nearest containing try...catch statement on the call
stack. If no such try...catch statement exists, then the execution of the program will terminate entirely. \
Some of the errors:

- SyntaxError: This indicates that a parsing error has occurred
- TypeError: This indicates an unsuccessful operation when none of the other Error objects are appropriate
- ReferenceError: This indicates that an invalid reference value has been detected
- RangeError: This indicates a value that is not in the set or range of allowable values
- URIError: This indicates that a URI handling function was used in a way that is incompatible with its definition

### Statements of control flow

The if statement.

The for statement. Conventional for

```js
for (InitializerExpression; ConditionExpression; UpdateExpression) IterationBody
```

The purpose of each part is as follows:

* The *InitializerExpression* initializes the iteration; this will be evaluated first and only once. This can be any
  statement (it usually includes a let or var assignment, but doesn't need to).
* The *ConditionExpression* checks whether the iteration may continue; this will be evaluated and coerced to a Boolean
  before each iteration to determine whether the next iteration will occur. This can be any expression.
* The *UpdateExpression* finalizes each iteration, ready for the next iteration. This will be evaluated at the end of
  each iteration. This can be any statement.
* The *IterationBody* contains the actual iteration logic—the code that will be evaluated on every iteration.

The for...of construct is used to iterate over an iterable object. Natively provided iterable objects include String,
Array, TypedArray, Map, and Set.

```js
for (LeftSideAssignment in IterableObject) IterationBody
```

* LeftSideAssignment can be anything that would be valid on the left side of an assignment expression and is evaluated
  within the scope of IterationBody on every new iteration
* IterableObject can be any expression that evaluates to an iterable object—in other words, anything that implements
  [Symbol.iterator] as a method
* IterationBody is any single-line or block statement

The while statement \
It's common to use while when the limit of iteration is, as yet, unknown or computed in a complex fashion. In such
instances, it is common to see true directly passed as ConditionExpression to while(...) and then a manual break;
statement within the iteration to force it to end. \
The while statement is also used in the context of generator functions if those generators are intended to produce
infinite outputs.

The switch statement \
Doing this is known as fallthrough:
```js
  switch (language) {
    case 'German':
    case 'Deutsche':
    case 'DE':
      welcomeMessage = 'Willkommen!';
      break;
    case 'French':
    case: 'Francais'
    case 'FR':
      welcomeMessage = 'Bienvenue!';
      break;
    default:
      welcomeMessage = 'Welcome!';
  }
```
When you have a switch statement residing in a function, it is sometimes best to simply return the intended values
instead of having to rely on break statements. \
Case blocks:
```js
switch (speed) {
  case 'slow': {
    console.log('Initiating slow speed');
    car.changeSpeedTo(speed);
    car.enableUrbanCollisionControl();
  }
  case 'fast': {
    console.log('Initiating fast speed');
    car.changeSpeedTo(speed);
    car.enableSpeedLimitWarnings();
    car.enableCruiseControlOption();
  }
  case 'regular':
  default: {
    console.log('Initiating regular speed');
    car.changeSpeedTo(speed);
  }
}
```
Multivariant conditions:
```js
switch (true) {
  case user.role === 'admin' || user.role === 'root': {
// ...
    break;
  }
  case user.role === 'member' && user.isActive: {
    // ...
    break;
  }
  case user.role === 'member' && user.isRecentlyInactive: {
// ...
    break;
  }
}
```
This pattern allows us to express more multivariate and hybrid conditions. You may usually feel inclined toward
multiple if/else/if/else statements

##### Handling cyclomatic complexity
Cyclomatic complexity is a measure of how many linearly independent paths there are through a program's code.
```js
if (a) {
  alpha();
  if (b) bravo();
  if (c) charlie();
}
if (d) delta();
```

Simplifying conditional spaghetti
