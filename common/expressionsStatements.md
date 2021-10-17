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
If we consider statements as containers of expressions, then we can consider blocks as containers of statements.
In other languages, they are sometimes called `compound statements` as they allow several statements to exist together.
Strictly speaking, blocks are statements. \
Blocks are very rarely used as completely isolated units of code (there's very limited benefit from doing so).
You'll usually find them within if, while, for and switch statements.

### Scopes and declarations
 - **The global environment**: There is only one of these, and it is considered the
outer scope of all other scopes. It is the global context in which all other
environments (that is, scopes) exist. The global environment mirrors a global
object that can be referred to by window or self in the browser and global in
Node.js.
- **A module environment**: This environment will be created for each distinct
JavaScript module that is run as part of a singular Node.js process or for
each <script type="module"> in the browser.
- **A function environment**: This environment will be in effect for every running
function, however it is declared or invoked.
- **A block environment**: This environment will be in effect for every block ({...})
in your program, whether following another language construct, such
as if(...) or while(...), or situated independently.
