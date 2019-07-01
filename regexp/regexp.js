const literalRegexp = /\d\d\d/
const objectRegexp = new RegExp('\\d\\d\\d', 'g') // need to escape slash
const string = 'la1la123lala654d'

const firstIndexOf3Digits = string.search(literalRegexp) // 5
const replaced3Digits = string.replace(objectRegexp, '3DIGITS') // la1la3DIGITSlala3DIGITSd
const found3Digits = string.match(objectRegexp) // [ '123', '654' ]
const splitedBy3Digits = string.split(objectRegexp) // [ 'la1la', 'lala', 'd' ]
console.log(objectRegexp.exec(string)); //[ '123', index: 5, input: 'la1la123lala654d' ]
const boolMatch = objectRegexp.test(string) //true

const greedyRepetition = () => {
  const str = 'Some sting. AAA repeats with AAA.'
  greedyARegexp = /A+/;
  nonGreedyARegexp = /A+?/;
  greedyARegexpGlobal = /A+/g;
  nonGreedyARegexpGlobal = /A+?/g;
  console.log(str.match(greedyARegexp)); //[ 'AAA', index: 12, input: 'Some sting. AAA repeats with AAA.' ]
  console.log(str.match(nonGreedyARegexp)); //[ 'A', index: 12, input: 'Some sting. AAA repeats with AAA.' ]
  console.log(str.match(greedyARegexpGlobal)); //[ 'AAA', 'AAA' ]
  console.log(str.match(nonGreedyARegexpGlobal)); //[ 'A', 'A', 'A', 'A', 'A', 'A' ]
};
greedyRepetition()