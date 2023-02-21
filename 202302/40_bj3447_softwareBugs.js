// 백준 3447 버그왕

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
const arr = fs.readFileSync(filePath).toString().trim().split('\n');
// const regex = /BUG/;

// const ans = arr.map((str) => {
//   let newStr = str.trim();
//   while (regex.test(newStr)) {
//     newStr = newStr.replace(regex, "");
//   }
//   return newStr;
// }).join('\n');

const ans = arr.map((str) => {
  let newStr = str.trim();
  while (newStr.search('BUG') !== -1) {
    newStr = newStr.replace('BUG', '');
  }
  return newStr;
}).join('\n');

console.log(ans);
