// 백준 15904 UCPC는 무엇의 약자일까?

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
const str = fs.readFileSync(filePath).toString().trim();

const re = /U[\w\s]*?C[\w\s]*?P[\w\s]*?C[\w\s]*?/;
console.log(re.exec(str) ? 'I love UCPC' : 'I hate UCPC');
