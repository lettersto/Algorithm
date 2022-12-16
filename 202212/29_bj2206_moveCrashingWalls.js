// 백준 2206 벽 부수고 이동하기

// 2. dijkstra
{

  class Heap {
    constructor() {
      this.heap = [null];
      this.last = 0;
    }
  
    get length() {
      return this.last;
    }
  
    heappush(val) {
      this.last += 1;
      this.heap[this.last] = val;
  
      let child = this.last;
      let parent = Math.floor(child / 2);
  
      while (parent >= 1) {
        if (this.heap[parent][0] > this.heap[child][0]) {
          const tmp = this.heap[parent];
          this.heap[parent] = this.heap[child];
          this.heap[child] = tmp;
  
          child = parent;
          parent = Math.floor(child / 2);
        } else {
          break;
        }
      }
    }
  
    heappop() {
      if (this.last <= 0) {
        return;
      }
  
      const minVal = this.heap[1];
      this.heap[1] = this.heap[this.last];
      this.last -= 1;
  
      let parent = 1;
      let child = parent * 2;
  
      while (child <= this.last) {
        if (child + 1 <= this.last && this.heap[child][0] > this.heap[child + 1][0]) {
          child += 1;
        }
  
        if (this.heap[parent][0] > this.heap[child][0]) {
          const tmp = this.heap[parent];
          this.heap[parent] = this.heap[child];
          this.heap[child] = tmp;
  
          parent = child;
          child = parent * 2;
        } else {
          break;
        }
      }
  
      return minVal;
    }
  }
}

// 1. 시간초과 BFS
// javascript shift, unshift는 O(n)이기 때문에 시간초과 발생
{
  const fs = require('fs');
  const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
  const [RC, ...board] = fs.readFileSync(filePath).toString().trim().split('\n');
  const [R, C] = RC.split(' ').map(Number);
  
  const shortestPath = () => {
    const heap = new Heap();
    heap.heappush([1, 0, 0, 0]);
    const visit = new Set();
  
    while (heap.length > 0) {
      const [curCost, curR, curC, crashed] = heap.heappop();
      if (visit.has(`${curR}-${curC}-${crashed}`)) {
        continue;
      }
      visit.add(`${curR}-${curC}-${crashed}`);
      if (curR === R - 1 && curC === C - 1) {
        return curCost;
      }
  
      for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const newR = curR + dr;
        const newC = curC + dc;
        if (0 > newR || newR >= R || 0 > newC || newC >= C || visit.has(`${newR}-${newC}-${crashed}`)) {
          continue;
        }
  
        if (board[newR][newC] === '1') {
          if (crashed || visit.has(`${newR}-${newC}-${1}`)) continue;
          heap.heappush([curCost + 1, newR, newC, 1]);
        } else {
          heap.heappush([curCost + 1, newR, newC, crashed]);
        }
      }
    }
  
    return -1;
  };
  
  console.log(shortestPath());
  
  const visit = new Set();
  
  const bfs = () => {
    const Q = [[0, 0, 0, 1]]; // curR, curC, 벽 부쉈으면 1 아니면 0
    visit.add(`${0}-${0}-${0}`);
  
    while (Q.length > 0) {
      const [curR, curC, crashed, curCost] = Q.shift();
      if (curR === R - 1 && curC === C - 1) {
        return curCost;
      }
  
      for (const [dr, dc] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]) {
        const newR = curR + dr;
        const newC = curC + dc;
        if (0 > newR || newR >= R || 0 > newC || newC >= C) {
          continue;
        }
  
        if (board[newR][newC] === '1') {
          if (crashed || visit.has(`${newR}-${newC}-${1}`)) {
            continue;
          }
          Q.push([newR, newC, 1, curCost + 1]);
          visit.add(`${newR}-${newC}-${1}`);
        } else {
          if (visit.has(`${newR}-${newC}-${crashed}`)) {
            continue;
          }
          Q.push([newR, newC, crashed, curCost + 1]);
          visit.add(`${newR}-${newC}-${crashed}`);
        }
      }
    }
  
    return -1;
  };
  
  console.log(bfs());
}


// 3. Deque 풀이
// direction에서 const ... of 대신 for loop를 쓰니 아주 빨라진다..
{
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
      this._length = 0;
    }
  
    get length() {
      return this._length;
    }
  
    push(val) {
      const newNode = new Node(val);
      if (this.head === null) {
        this.head = newNode;
      } else {
        this.tail.next = newNode;
      }
      this.tail = newNode;
      this._length += 1;
    }
  
    shift() {
      if (this._length === 0) {
        return;
      }
      const tmp = this.head.val;
      this.head = this.head.next;
      this._length -= 1;
      return tmp;
    }
  }
  
  const fs = require('fs');
  const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
  const [RC, ...board] = fs.readFileSync(filePath).toString().trim().split('\n');
  const [R, C] = RC.split(' ').map(Number);
  
  const visit = new Set();
  
  const bfs = () => {
    const Q = new Deque();
    const D = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    Q.push([0, 0, 0, 1]);
    visit.add(`${0}-${0}-${0}`);
  
    while (Q.length > 0) {
      const [curR, curC, crashed, curCost] = Q.shift();
      if (curR === R - 1 && curC === C - 1) {
        return curCost;
      }
  
      for (let i = 0; i < 4; i++) {
        const newR = curR + D[i][0];
        const newC = curC + D[i][1];
        if (0 > newR || newR >= R || 0 > newC || newC >= C) {
          continue;
        }
  
        if (board[newR][newC] === '1') {
          if (crashed || visit.has(`${newR}-${newC}-${1}`)) {
            continue;
          }
          Q.push([newR, newC, 1, curCost + 1]);
          visit.add(`${newR}-${newC}-${1}`);
        } else {
          if (visit.has(`${newR}-${newC}-${crashed}`)) {
            continue;
          }
          Q.push([newR, newC, crashed, curCost + 1]);
          visit.add(`${newR}-${newC}-${crashed}`);
        }
      }
    }
  
    return -1;
  };
  
  console.log(bfs());
}
