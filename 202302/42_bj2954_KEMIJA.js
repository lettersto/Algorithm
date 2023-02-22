// LeetCode 2954 창영이의 일기장

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
const sentence = fs.readFileSync(filePath).toString().trim();

const regex = /([aeiou])p\1/g;
console.log(sentence.replaceAll(regex, '$1'));

// replace의 두 번째 인자로 함수가 오는 경우
// replace all처럼 모든 일치하는 값을 return value로 바꾼다.
// 들어오는 parameter는 exec이나 match의 결과 순서와 같다.
console.log(sentence.replace(regex, (_, w) => w));
