/*
A strict comparison (e.g., ===) is only true if the operands are of the same TYPE and VALUE.

Loose equality comparison (e.g. ==) converts the operands to the same TYPE before making the
VALUE comparison. Convert to common type means - coercion - two values are compared only after attempting
to convert them into a common type.
Coersion could be:
* to string (fired with + operator, when any operand is a string, to check what we'll got String(value))
* to boolean (fired with || && ! operators, to check what we'll got Boolean(value),
 || && return value of origin operand, let x = 'hello' && 123, x is 123,
 that's why we can do those expressions in code, damn!)
* to number (fired with operators:
  comparison operators (>, <, <=,>=)
  bitwise operators ( | & ^ ~)
  arithmetic operators (- + * / % ). Binary (with two operands) + does not trigger numeric conversion,
   if any operand is a string.
  Unary + operator (+value)
  loose equality operators (==, !=) NOTE == Does NOT trigger numeric conversion when operands are string.
  to check what we'll got Number(value) Number(null) -> 0, Number(undefined) -> NaN)

For relational abstract comparisons (e.g., <=), the operands are first converted to primitives,
then to the same type, before comparison.

When we talking about coersion of objects -> different story. When we trying to coerse not-primitive type to
primitive, js will call [[ToPrimitive]] method on the object, Numeric conversion first calls valueOf with a
fallback to toString. String conversion does the opposite: toString followed by valueOf.
If valueOf, toString return non-primitive - value is ignored. 
Different operators can trigger different conversion depends on their PREFFERED TYPE, that they need to compare.
Two exeptions -> == and + triggers default conversion modes (in most cases numeric, exept Date - that has string)

So ES5 style - is to redeclare toString and valueOf.
ES6 - is to declare [Symbol.toPrimitive] method.

Boolean - easiest - every not primitive type - is true.

typeof - string representation of value type.
*/

const casting = _ => {
  console.log("0 || 1 = " + (0 || 1)); //1
  console.log("1 || 2 = " + (1 || 2)); //1
  console.log("0 && 1 = " + (0 && 1)); //0
  console.log("1 && 2 = " + (1 && 2)); //2
  console.log(1 + "2" + "2"); //122
  console.log(1 + +"2" + "2"); //32
  console.log(1 + -"1" + "2"); //02
  console.log(+"1" + "1" + "2"); //122
  console.log("A" - "B" + "2"); //NaN2
  console.log("A" - "B" + 2); //NaN, + - here is arithmetical
  console.log(false == '0'); // true
  console.log(false === '0'); // false
  console.log(1 < 2 < 3); // true
  console.log(3 > 2 > 1); // false
  console.log(typeof undefined == typeof NULL); // true, since 'NULL' is not null as a type, but as variable NULL, js
                                                // is case sencetive
  console.log(typeof undefined == typeof null); // false, typeof null -> object, so they aren't equal
  console.log((() => {
    var z = 1, y = z = typeof y;
    return z;
  })()); // undefined, assignment operator moves from right
  // to left, first hoisted var z becomes undefinet, sinse y is undefined, y = z -> undefined, than z becomes 1.
  console.log(JSON.stringify(NaN)); //null
  console.log(String(NaN)); //'NaN'
  console.log(null === null && null == undefined); //true, null equals to null or undefined, and that's it. 
  console.log(NaN === NaN); // false, NaN doesn't equal to anything, even itself, we need Number.isNaN() to check it.
  console.log(true + false);             // 1
  console.log(12 / "6");                 // 2
  console.log("number" + 15 + 3);        // 'number153'
  console.log(15 + 3 + "number");        // '18number'
  console.log([1] > null);               // true
  console.log("foo" + +"bar");          // 'fooNaN'
  console.log('true' == true);           // false, since 'true' is string, but another operator is not string, numeric
                                        // comparison
  console.log(false == 'false');         // false
  console.log(null == '');               // false
  console.log(!!"false" == !!"true");    // true
  console.log(['x'] == 'x');             // true
  console.log([] + null + 1);            // 'null1', somehow Array defaul converting is toString in this case, so '' +
                                        // null + 1
  console.log([1, 2, 3] == [1, 2, 3]);       // false
  console.log({} + [] + {} + [1]);             // '0[object Object]1'
  console.log(!+[] + [] + ![]);              // 'truefalse' +[] - 0. !+[] = !0 = true. true + [] ([] - '') = true + ''.
                                            // true + '' + ![] (!true - false) = true + '' + false 8-\
  console.log(new Date(0) - 0);          // 0, valueOf - 123343241324 - like, new Date(0) -> 0, 0 - 0 = 0
  console.log(new Date(0) + 0);          // 'Thu Jan 01 1970 02:00:00(EET)0', toSting
};
// casting()

const toPrimitiveCheck = _ => {
  class A {
    constructor(value) {
      this.value = value;
    }

    [Symbol.toPrimitive](prefferedType) {
      switch (prefferedType) {
        case 'string':
          console.log('toString called');
          return String(this.value);
        case 'number':
          console.log('valueOf called');
          return Number(this.value);
        default:
          console.log('default called');
          return this.value;
      }
    }
  }

  console.log(new A('myString') == 'myString'); // default, true
  console.log(new A('myString') + 'myString'); // default, myStringmyString
  console.log(+new A('myString')); // valueOf, NaN
  console.log(new A(4) / 2); // valueOf 2
  console.log(String(new A(1))); // toString '1'
};
// toPrimitiveCheck()
