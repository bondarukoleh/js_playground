### Expressions
An expression is the most granular type of syntactic container.

- 'hi ' + 'there'
- EXPRESSION + EXPRESSION
- (
  'this is part of' +
  ' ' +
  ['a', 'very', 'long', 'expression'].join(' ')
  )
- (class Foo {}); // Legal Expression
- (function() {}); // Legal Expression
- ([1, 2, 3]); // Legal Expression
- ({ a: 1, b: 2 }); // Legal Expression
- (if (a) {}); // ! SyntaxError (Not an Expression!)
- (while (x) {}); // ! SyntaxError (Not an Expression!)

[![](https://raw.githubusercontent.com/bondarukoleh/js_playground/develop/common/blockExpressionStatement.PNG "blockExpressionStatement")]()

### Statements
A statement contains an expression, and is, therefore, another type of syntactic container.
A statement is formed in a variety of situations. These include the following:
 - When you terminate an expression with a semicolon (1 + 2;)
 - When you use any of the for, while, switch, do..while, or if constructs
 - When you create a function via a function declaration (function Something(){})
 - They are automatically formed by the language's natural automatic semicolon insertion (ASI) placement of semicolon
 after new lines (that is, \n).

The syntax of a function declaration (function name() {}) will always form a statement unless it appears in the context
of an expression, in which case it'll naturally be a `named function expression`.

When we place one expression after another, we tend to terminate each individual one with
a semicolon. By doing this, we are forming a statement. If we don't do this ASI will do.

So this won't work:
```js
function sum(a, b) {
  return
    a + b;
}
sum(a, b); // undefined
```
To fix this, we can either place a + b on the same line as our return statement or we can use a group operator to
contain our indented expression:
```js
function sum(a, b) {
  return (
    a + b
  );
}
```

### Blocks
