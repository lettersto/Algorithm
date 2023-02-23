// 백준 4659 비밀번호 발음하기

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
const arr = fs.readFileSync(filePath).toString().trim().split('\n');
arr.pop();

const test1 = /[aeiou]/;
const test2 = /[aeiou]{3}/;
const test3 = /[b-df-hj-np-tv-z]{3}/;
const test4 = /([a-df-np-z])\1/;

const ans = arr.map((pwd) => {
  const newPwd = pwd.trim();
  if (!test1.test(newPwd)
    || test2.test(newPwd)
    || test3.test(newPwd)
    || test4.test(newPwd)) {
    return `<${newPwd}> is not acceptable.`;
  }
  return `<${newPwd}> is acceptable.`;
}).join('\n');

console.log(ans);
