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
It's important to see that both declarative and imperative approaches are not completely distinct (diff).
They are at either ends of one spectrum. On the declarative side of the spectrum, you are operating at a higher
level of abstraction, and are hence not exposed to the implementation details that you would be without such
abstraction. On the imperative side of the spectrum, you are operating at a lower level of abstraction.

### The movement of control
In JavaScript, there are several ways that control can be moved from one piece of code to another.
Generally, code will be evaluated from left-to-right and top-to-bottom until it reaches any of the following situations:
- Invoking (invocation of a function by fn(), fn`` or new fn())
- Returning (returning from a function via either implicit or explicit return)
- Yielding (yielding from a generator via yield)
- Breaking (breaking from a loop or switch via break)
- Continuing (continuing an iteration via continue)
- Throwing (throwing an exception via throw)
