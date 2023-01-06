// 백준 14502 연구소

// 패턴도 딱히 없는 것 같고, 가로 세로의 최대도 8로 작았기 때문에 brute force 사용
// 1. 맨 처음 MAP을 순회하며, 0(빈 곳)이 나오면 row, col 정보를 empty에 2(바이러스)이 나오면 Queue에 담는다.
// 2. 조합을 이용해 빈 공간 3개를 뽑는다. 
// 3. 뽑은 빈 공간 3개를 벽으로 만든다.
// 4. 바이러스를 bfs를 돌려서 채울 수 있는 만큼 채운다.
// 5. 남은 빈 공간을 체크하고 max 빈 공간 값을 갱신한다.
// 이를 모든 빈 공간 조합에 대해 반복한다.

// 직접 deque도 정의해봤는데, lodash deepcopy 같은 거 쓰지 않는 이상
// 직접 정의한 deque를 쓰면 코드만 길어지고 이득은 없는 것 같다
// 이걸 deepcopy 어떻게 할지 몰라서 다시 새로 생성했더니 시간 상의 이점이 없다

// 그냥 내장 array를 썼을 때가 더 빠를 정도...

{
  // 내장 array를 쓴 풀이
  const fs = require('fs');
  const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
  let [RC, ...MAP] = fs.readFileSync(filePath).toString().trim().split('\n');
  const [R, C] = RC.split(' ').map(Number);
  MAP = MAP.map((row) => row.trim().split(' ').map(Number));

  const empty = [];
  const Q = [];
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (MAP[r][c] === 0) {
        empty.push([r, c]);
      }
      if (MAP[r][c] === 2) {
        Q.push([r, c]);
      }
    }
  }

  const bfs = (walls) => {
    const copiedQ = Q.map((item) => [...item]);
    const copiedMap = MAP.map((item) => [...item]);
    // prettier-ignore
    const D = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    walls.forEach((wall) => {
      copiedMap[empty[wall][0]][empty[wall][1]] = 1;
    });
    let emptyCnt = empty.length - 3;

    while (copiedQ.length > 0) {
      const [curR, curC] = copiedQ.shift();

      for (let i = 0; i < D.length; i++) {
        const newR = curR + D[i][0];
        const newC = curC + D[i][1];

        if (
          newR < 0 ||
          newR >= R ||
          newC < 0 ||
          newC >= C ||
          copiedMap[newR][newC] !== 0
        ) {
          continue;
        }
        copiedMap[newR][newC] = 2;
        copiedQ.push([newR, newC]);
        emptyCnt -= 1;
      }
    }

    return emptyCnt;
  };

  let ans = 0;
  const walls = [-1, -1, -1];

  const makeWalls = (depth, minV) => {
    if (depth === 3) {
      ans = Math.max(ans, bfs(walls));
      return;
    }

    for (let i = minV + 1; i < empty.length; i++) {
      walls[depth] = i;
      makeWalls(depth + 1, i);
    }
  };

  makeWalls(0, -1);
  console.log(ans);
}

{
  // deque
  class Node {
    constructor(val) {
      this.val = val;
      this.next = null;
    }
  }
  
  class Deque {
    constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
  
    push(val) {
      const newNode = new Node(val);
      if (!this.head) {
        this.head = newNode;
      } else {
        this.tail.next = newNode;
      }
      this.tail = newNode;
      this.length += 1;
    }
  
    shift() {
      if (this.length === 0) {
        return;
      }
      const tmp = this.head;
      this.head = this.head?.next;
      this.length -= 1;
      return tmp.val;
    }
  }
  
  const fs = require('fs');
  const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
  let [RC, ...MAP] = fs.readFileSync(filePath).toString().trim().split('\n');
  const [R, C] = RC.split(' ').map(Number);
  MAP = MAP.map((row) => row.trim().split(' ').map(Number));
  
  const empty = [];
  const Q = [];
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (MAP[r][c] === 0) {
        empty.push([r, c]);
      }
      if (MAP[r][c] === 2) {
        Q.push([r, c]);
      }
    }
  }
  
  const bfs = (walls) => {
    // const copiedQ = structuredClone(Q); // 사용 불가
    // const copiedQ = Q.map((item) => [...item]);  // only 2 depth copy
    // const copiedQ = JSON.parse(JSON.stringify(Q));
    // 새로 만든 클래스라 안 되는 듯... JSON을 거치고 나면 정의한 method가 사용이 안 된다.
    const copiedQ = new Deque();
    Q.forEach((virus) => copiedQ.push(virus));
    const copiedMap = MAP.map((item) => [...item]);
    // prettier-ignore
    const D = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    walls.forEach((wall) => {
      copiedMap[empty[wall][0]][empty[wall][1]] = 1;
    });
    let emptyCnt = empty.length - 3;
  
    while (copiedQ.length > 0) {
      const [curR, curC] = copiedQ.shift();
  
      for (let i = 0; i < D.length; i++) {
        const newR = curR + D[i][0];
        const newC = curC + D[i][1];
  
        if (
          newR < 0 ||
          newR >= R ||
          newC < 0 ||
          newC >= C ||
          copiedMap[newR][newC] !== 0
        ) {
          continue;
        }
        copiedMap[newR][newC] = 2;
        copiedQ.push([newR, newC]);
        emptyCnt -= 1;
      }
    }
  
    return emptyCnt;
  };
  
  let ans = 0;
  const walls = [-1, -1, -1];
  
  const makeWalls = (depth, minV) => {
    if (depth === 3) {
      ans = Math.max(ans, bfs(walls));
      return;
    }
  
    for (let i = minV + 1; i < empty.length; i++) {
      walls[depth] = i;
      makeWalls(depth + 1, i);
    }
  };
  
  makeWalls(0, -1);
  console.log(ans);
}
