const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
const N = +fs.readFileSync(filePath).toString().trim();
const arr = Array.from({length: N}, () =>
  new Array(N).fill(' '),
);

const makeStar = (rowStart, rowEnd, colStart, colEnd) => {
  if (rowStart + 1 === rowEnd && colStart + 1 === colEnd) {
    arr[rowStart][colStart] = '*';
    return;
  }
  const newRow = Math.floor((rowEnd - rowStart) / 3);
  const newCol = Math.floor((colEnd - colStart) / 3);

  // 0 - 2, 0 - 2
  makeStar(rowStart, rowStart + newRow, colStart, colStart + newCol);
  // 0 - 2, 3 - 5
  makeStar(rowStart, rowStart + newRow, colStart + newCol, colStart + newCol * 2);
  // 0 - 2, 6 - 8
  makeStar(rowStart, rowStart + newRow, colStart + newCol * 2, colStart + newCol * 3);
  // 3 - 5, 0 - 2
  makeStar(rowStart + newRow, rowStart + newRow * 2, colStart, colStart + newCol);
  // 3 - 5, 3 - 5
  // 뛰어 넘기
  // 3 - 5, 6 - 8
  makeStar(rowStart + newRow, rowStart + newRow * 2, colStart + newCol * 2, colStart + newCol * 3);
  // 6 - 8, 0 - 2
  makeStar(rowStart + newRow * 2, rowStart + newRow * 3, colStart, colStart + newCol);
  // 6 - 8, 3 - 5,
  makeStar(rowStart + newRow * 2, rowStart + newRow * 3, colStart + newCol, colStart + newCol * 2);
  // 6 - 8, 6 - 8
  makeStar(rowStart + newRow * 2, rowStart + newRow * 3, colStart + newCol * 2, colStart + newCol * 3);
};

makeStar(0, N, 0, N);

let ans = '';
arr.forEach((row) => ans += row.join('') + '\n');
console.log(ans.trimEnd());
