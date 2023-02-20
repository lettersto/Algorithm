// 백준 14405 피카츄

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
const word = fs.readFileSync(filePath).toString().trim();

const regex = /^(?:pi|ka|chu)+$/;
console.log(regex.test(word.trim()) ? 'YES' : 'NO');
