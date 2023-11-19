/*
Primitive:
String
Number
BigInt
Boolean
null
undefined

Symbol
Object
*/

const maxNummer = 9007199254740991
function testBigInt() {
  console.log(9007199254740991 + 1); // 9007199254740992
  console.log(9007199254740991 + 2); // 9007199254740992

  const bigInt = 9007199254740992n
  console.log(bigInt + 1n); // 9007199254740994n
}
testBigInt()