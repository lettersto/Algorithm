// 백준 2579 계단 오르기

const fs = require("fs");

const [N, ...stairs] = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim()
    : `6
10
20
15
25
10
20`
).split("\n").map(Number);

{
  const arr = new Array(N).fill(0).map(_ => [0, 0]);
  
  const climbingStairs = () => {
    if (N <= 2) {
      return stairs.reduce((item, acc) => item + acc, 0);
    }
  
    // base case
    arr[0] = [stairs[0], stairs[0]];  // 1step, 2step
    arr[1] = [stairs[0] + stairs[1], stairs[1]];
  
    // dp
    for (let i = 2; i < N; i++) {
      arr[i][0] = arr[i - 1][1] + stairs[i];
      arr[i][1] = Math.max(...arr[i - 2]) + stairs[i];
    }
  
    return Math.max(...arr[N - 1]);
  };
  
  console.log(climbingStairs());
}

// 다른 사람 풀이
// array를 2차원으로 만들지 않고도 가능했다.
// base case를 3까지로 바꾸고 하면 된다.
// 무조건 base case를 3까지 만든 것을 보니 NaN이 발생하든 말든 그냥 한 것 같은데,
// 이건 예외처리를 해주는 게 옳다고 생각한다.

// 1계단 이전인 경우 = stairs[i] + stairs[i - 1] + arr[i - 3]
// 2계단 이전인 경우 = stairs[i] + arr[i - 2]
// 위 둘의 max값을 arr에 저장하면 된다.

{
  const arr = [];
  
  const climbingStairs = () => {
    if (N <= 2) {
      return stairs.reduce((item, acc) => item + acc, 0);
    }
  
    if (N === 3) {
      return Math.max(stairs[0] + stairs[2], stairs[1] + stairs[2]);
    }
  
    // base case
    arr.push(stairs[0]);
    arr.push(stairs[0] + stairs[1]);
    arr.push(Math.max(stairs[0] + stairs[2], stairs[1] + stairs[2]));
  
    // dp
    for (let i = 3; i < N; i++) {
      arr[i] = Math.max(
        stairs[i] + stairs[i - 1] + arr[i - 3],
        stairs[i] + arr[i - 2]
      );
    }
  
    return arr[N - 1];
  };
  
  console.log(climbingStairs());
}
