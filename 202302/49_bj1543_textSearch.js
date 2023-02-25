// 백준 1543 문서 검색

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
const [str, pattern] = fs.readFileSync(filePath).toString().split(/\r?\n/);

const regex = new RegExp(pattern, 'g');
console.log(str.match(regex)?.length ?? 0);
