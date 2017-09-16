var rawTextArr = [
  ['input {', '    outline: none;', '}'].join('\n'),
  ['.search-slogan {', '    outline: none;', '}'].join('\n'),
];

var diff = require('diff');
console.log(rawTextArr[0], rawTextArr[1]);
console.log(diff.diffLines(rawTextArr[0], rawTextArr[1]));
