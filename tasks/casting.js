console.log("0 || 1 = "+(0 || 1)); //1
console.log("1 || 2 = "+(1 || 2)); //1
console.log("0 && 1 = "+(0 && 1)); //0
console.log("1 && 2 = "+(1 && 2)); //2
console.log(1 +  "2" + "2"); //122
console.log(1 +  +"2" + "2"); //32
console.log(1 +  -"1" + "2"); //02
console.log(+"1" +  "1" + "2"); //122
console.log( "A" - "B" + "2"); //NaN2
console.log( "A" - "B" + 2); //NaN, + - here is arithmetical
console.log(false == '0') // true
console.log(false === '0') // false
console.log(1 < 2 < 3); // true
console.log(3 > 2 > 1); // false