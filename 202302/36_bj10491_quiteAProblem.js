// 백준 10491 Quite a problem

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
const arr = fs.readFileSync(filePath).toString().trim().split('\n');

const regex = /problem/i;
const ans = arr.map((item) => regex.test(item) ? 'yes': 'no').join('\n');

console.log(ans);

//❗이때 regex에 g flag를 붙이면 안 된다!!!!!!
// RegExp.prototype.test의 특수한 성격 때문이다. (exec도 마찬가지이다.)

// g flag를 붙이면 state를 저장하기 시작하는데,
// 이전 match에서 lastIndex를 저장한다.
// 그리고 다음 test를 부르는 순간, lastIndex부터 search를 시작한다.

// 예시
const re = /Starbucks/g;
const str = `Starbucks has new drink, so I'm going to visit Starbucks tomorrow.`;

console.log(re.lastIndex);  // 0 - 시작 안 함
console.log(re.test(str));  // true
console.log(re.lastIndex);  // 9 - 직전 search에서 index 0~9 사이의 Starbucks를 찾음
console.log(re.test(str));  // true
console.log(re.lastIndex);  // 56 - 직전 search에서 index 47~9 사이의 Starbucks를 찾음
console.log(re.test(str));  // false
console.log(re.lastIndex);  // 0 - 실패해서 reset

const re2 = /Starbucks/g;
const strArr = [
  'Starbucks has new drink.',
  'Starbucks closes at 22:00',
];

strArr.forEach((str) => {
  console.log(re2.lastIndex); 
  console.log(re2.test(str));
});

// 위의 결과는
// 0
// true
// 9
// false
// 두 string이 다른 string이라는 것을 인지하지 못하고,
// 두 번째 string인 'Starbucks closes at 22:00'에서
// 이전 마지막 index인 9 + 1부터 search를 다시 시작했기 때문에
// Starbucks 글자가 있어도 찾지를 못했다.
