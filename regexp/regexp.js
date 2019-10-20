const commonCheck = () => {
  const literalRegexp = /\d\d\d/
  const objectRegexp = new RegExp('\\d\\d\\d', 'g') // need to escape slash
  const string = 'la1la123lala654d'

  const firstIndexOf3Digits = string.search(literalRegexp) // 5
  const replaced3Digits = string.replace(objectRegexp, '3DIGITS') // la1la3DIGITSlala3DIGITSd
  const found3Digits = string.match(objectRegexp) // [ '123', '654' ]
  const splitedBy3Digits = string.split(objectRegexp) // [ 'la1la', 'lala', 'd' ]
  console.log(objectRegexp.exec(string)); //[ '123', index: 5, input: 'la1la123lala654d' ]
  const boolMatch = objectRegexp.test(string) //true
}
// commonCheck()

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

  console.log(greedyARegexp.exec(str)); // ['AAA', index: 12, input: 'Some sting. AAA repeats with AAA.' ]
  console.log(nonGreedyARegexp.exec(str)); //[ 'A', index: 12, input: 'Some sting. AAA repeats with AAA.' ]
  console.log(greedyARegexpGlobal.exec(str)); // [ 'AAA', index: 12, input: 'Some sting. AAA repeats with AAA.' ]
  console.log(nonGreedyARegexpGlobal.exec(str)); //[ 'A', index: 12, input: 'Some sting. AAA repeats with AAA.' ]
};
// greedyRepetition()

const classCheck = () => {
  const r = /[h?ello]/
  const strings = ['h', 'ello', 'hello', 'olleh']
  console.log(strings[3].match(r));
  strings.forEach(s => console.assert(r.test(s), `Didn't find anything`))
}
// classCheck()

const backReferences = () => {
  const regex = /<(neededTag|secondTag)>.*<\\?\1>/
  const str = "<div> Some text <neededTag> Needed text <\\neededTag> <secondTag> Needed to <secondTag> <\\div>"
  console.log(str.match(regex)); // [ '<neededTag> Needed text <\\neededTag>',
  // '<secondTag> Needed to <secondTag>' ]
}
// backReferences()

const globalDifference = () => {
  const html = "<div class='test'><b>Hello</b> <i>world!</i></div>";
  console.log(html.match(/<(\/?)(\w+)([^>]*?)>/))
  // [ '<div class=\'test\'>', - first tag that satisfy pattern
  // '',
  // 'div',
  // ' class=\'test\'',
  // index: 0,
  // input: '<div class=\'test\'><b>Hello</b> <i>world!</i></div>' ] -> whole string

  console.log(html.match(/<(\/?)(\w+)([^>]*?)>/g))
  //[ '<div class=\'test\'>', '<b>', '</b>', '<i>', '</i>', '</div>' ] -> all strings that satisfy pattern
}
// globalDifference()

const referCaptures = () => {
  const html = "<b class='hello'>Hello</b> <i>world!</i>";
  const pattern = /<(\w+)([^>]*)>(.*?)<\/\1>/g;

  let match = pattern.exec(html)
  console.log(match);
  // [ '<b class=\'hello\'>Hello</b>', -> matched substring
  // 'b', -> first capture (\w+)
  // ' class=\'hello\'', -> second capture ([^>]*)
  // 'Hello', -> third (.*?)
  // index: 0,
  // input: '<b class=\'hello\'>Hello</b> <i>world!</i>' ]
  match = pattern.exec(html)
  console.log(match);
// [ '<i>world!</i>', -> next substring satisfied pattern
//   'i', -> first capture (\w+)
//   '', -> second capture ([^>]*)
//   'world!', -> third (.*?)
//   index: 27,
//   input: '<b class=\'hello\'>Hello</b> <i>world!</i>' ]

{
  const html = "<b class='hello'>Hello</b> <i>world!</i>";
  const pattern = /<(\w+)([^>]*)>(.*?)<\/\1>/g;
  while(matches = pattern.exec(html)){
    console.log(matches) // same result as previous.
  }
  /* Made regex once more, because, when we do regex.exec - there is inner counter
  that count how many exec was called, and don't do anything if count is out
  so when we called two times exec before while - we fire count to 0. That's why 
  we create it one more time in this scope
  */
}

}
// referCaptures()

const getTheReplaceStringByReference = () => {
  const str = 'camelCaseString'
  const findCamelCaseChars = /([A-Z])/g 
  console.log(str.replace(findCamelCaseChars, "-$1")) //camel-Case-String
  /* 
    Main thing that "$1" - it's reference to capture in ([A-Z]).
  */
}
// getTheReplaceStringByReference()

const nonCapturedCapture = () => {
  const str = 'ninja-sword, sword, shaka-laka'
  const doubleCapture = /((ninja-)+)(sword)/
  console.log(str.match(doubleCapture))
  // [ 'ninja-sword', -> matched pattern
  // 'ninja-', -> first capture ((ninja-)+) two same captures
  // 'ninja-', -> second capture (ninja-)
  // 'sword', -> third capture (sword)
  // index: 0,
  // input: 'ninja-sword, sword, shaka-laka' ]
  // to avoid this stuff ?:
  const singleCapture = /((?:ninja-)+)(sword)/
  console.log(str.match(singleCapture))
  // [ 'ninja-sword',
  // 'ninja-', -> first capture ((?:ninja-)+)
 // 'sword',  -> second capture (sword)
  // index: 0,
  // input: 'ninja-sword, sword, shaka-laka' ]
  // Problem solved
}
// nonCapturedCapture()

const replaceFunction = () => {
  const selfClosingTags = /^(area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;
  let html = '<tag> some text <base/> other text <img/> text1 <not_self/> text2 <not_another_self/> text3 <tag>'
  const parsed = html.replace(/(<(\w+))\/>/g, (fulMatch, beforeSlash, tag) => {
    console.log(fulMatch);
    console.log(beforeSlash);
    console.log(tag);
    return selfClosingTags.test(tag) ? fulMatch : `${beforeSlash}></${tag}>`
  })
  console.log(parsed);
  // <tag> some text <base/> other text <img/> text1 <not_self></not_self>
  //  text2 <not_another_self></not_another_self> text3 <tag></tag>
}
// replaceFunction()