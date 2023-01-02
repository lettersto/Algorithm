// 백준 2098 외판원 순회

//✨ 도시 방문 여부를 비트 마스크로 표현하기 ✨

// 0. 순회가 가능하다 = cycle이 형성된다.
// 어떤 점에서 시작해도 최소 거리 값을 구할 수 있다는 의미
// 즉, 아무 점에서 한 번만 dfs를 돌려봐도 답을 구할 수 있다.

// 1. 방문한 도시는 0, 방문 안 한 도시는 1로 표시
// 뒤에서부터 i번째는 i 번째 도시의 방문 여부
// 0001 (10진수: 1) -> 4개의 도시 중 0번째 도시 방문
// 1100 (10진수: 12) -> 4개의 도시 중 2, 3번째 도시 방문

// 2. 방문 안 한 도시를 방문한 도시로 표시하기 위해서는 | operator 사용
// 둘 중에 하나라도 1이라면 1, 둘 모두 0이라면 0
// 예시)
// 0000 | 0001 = 0001
// 0010 | 0001 = 0011
// 0110 | 0001 = 0111
// 0001 | 1000 = 1001

// 3. | operator의 operand는
// a) 원래 visit을 기록해뒀던 숫자와 b) 새로 방문할 부분에 대한 숫자
// b는 1을 left shift(<<) 해서 표현이 가능하다
// 1을 left shift할 때마다 2의 배수만큼 숫자가 커진다.
// 예시)
// console.log(1 << 0); // 1 - 0001
// console.log(1 << 1); // 2 - 0010
// console.log(1 << 2); // 4 - 0100
// console.log(1 << 3); // 8 - 1000

// 4. 해당 도시를 방문했는지 확인할 때는 & operator를 사용
// &는 두 숫자의 비트가 모두 1이어야만 1을 반환하기 때문에
// 확인하려는 도시의 부분이 비었다면 0을 반환하게 된다.
// 예시)
// console.log(7 & (1 << 4)); // 0111 & 1000 = 0000
// console.log(7 & (1 << 3)); // 0111 & 0100 = 0100 (10진수: 8)
// console.log(7 & (1 << 2)); // 0111 & 0010 = 0010 (10진수: 4)

// 5. 모든 도시를 다 방문했는지 여부를 확인할 때는
// 모든 비트가 1일 때의 값과 동일한지를 보면 된다.
// 예) 4 도시) 1111인지 여부 체크 => 이는 2진수 10000 - 1 (1 << 5 - 1)과 동일
// 즉, n개의 도시를 모두 방문했을 때는 1 << n - 1 의 상태가 된다.

// 6. 이제 dp를 표현해야 한다.
// dp[i][j]는
// (i) i번째 도시를
// (j - bit mask로 표현) 어떤 도시를 거쳐 도착했을 때의
// (dp[i][j]) 최소 거리를 의미한다.
// 이를 돌면서 이미 dp값이 있다면 dp값을 return한다.

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
let [N, ...adj] = fs.readFileSync(filePath).toString().trim().split('\n');
N = +N;
adj = adj.map((item) => item.trim().split(' ').map(Number));

const allVisited = (1 << N) - 1;
const dp = new Array(N).fill(0).map(() => new Array(allVisited).fill(-1));

// 임의로 0번도시 부터 시작해 탐색할 것
const dfs = (curV, curPath) => {
  // 6. curPath가 allVisited에 도달하면 return 시켜야 한다
  // 순회를 하려면 모든 도시를 방문한 후 다시 처음 도시인 0으로 돌아와야 한다.
  // 이때 curV에서 0번 도시로 갈 수 있다면 그 값 반환
  // 아니라면 못 가니 Infinity 반환
  if (curPath === allVisited) {
    return adj[curV][0] !== 0 ? adj[curV][0] : Infinity;
  }

  // 1. 이미 dp에 있는 경우면 (이미 방문한 적이 있는 도시 && 경로) 있는 값 반환
  // 없다면 계속 코드를 진행하며 dp값 채우기
  if (dp[curV][curPath] !== -1) {
    return dp[curV][curPath];
  }

  // 방문 안 한 곳은 -1, 방문 한 곳인데 모르거나 도달할 수 없으면 Infinity
  dp[curV][curPath] = Infinity;

  // 3. 다음 도시 탐색
  for (let neiV = 0; neiV < N; neiV++) {
    // 4. 방문했거나 갈 수 없는 경우 continue
    if ((curPath & (1 << neiV)) || adj[curV][neiV] === 0) {
      continue;
    }
    // 2 + 5. dp값을 최솟 값으로 채우기 + 다음 도시로 넘어가기
    // 최솟값은 dp에 기록된 값일 수도 있고
    // 새로 계산한 값일 수도 있다. 
    dp[curV][curPath] = Math.min(
      dp[curV][curPath],
      adj[curV][neiV] + dfs(neiV, curPath | (1 << neiV)),
    );
  }

  return dp[curV][curPath];
};

// 0번 도시부터 시작. 0번 도시는 방문했으니 000000001 = 1
console.log(dfs(0, 1));
