// LeetCode 1834 Single-Threaded CPU

// 항상 전체를 heapify하고 나서 하는 것으로 생각했는데,
// 일부만(혹은 조건에 일치하는 것만) heapify할 수도 있다.
// https://leetcode.com/problems/single-threaded-cpu/solutions/1163980/python-sort-then-heap/

// 이런 문제를 풀고 있다 보면 진짜 JS에대한 정이 다 떨어진다...
// 풀이를 바꿀 때마다 자료 구조 내부도 바꿔야 하고 ㅎㅎ...

// 이 사람 코드도 나중에 봐봐야 겠다
// https://leetcode.com/problems/single-threaded-cpu/solutions/1164146/javascript-minimum-heap/?languageTags=javascript

// 그나저나 leetcode는 lodash와 MinPriorityQueue 등을 내장으로 제공한다
// ...? 아................................. 왜 이제 알았지
// https://support.leetcode.com/hc/en-us/articles/360011833974-What-are-the-environments-for-the-programming-languages-

class Heap {
  constructor() {
    this.heap = [null];
    this.length = 0;
  }

  push(val) {
    this.heap[++this.length] = val;

    let c = this.length;
    let p = Math.floor(c / 2);

    while (p >= 1) {
      if (
        this.heap[p][0] > this.heap[c][0] ||
        (this.heap[p][0] === this.heap[c][0] &&
          this.heap[p][1] > this.heap[c][1])
      ) {
        const tmp = this.heap[p];
        this.heap[p] = this.heap[c];
        this.heap[c] = tmp;

        c = p;
        p = Math.floor(c / 2);
      } else break;
    }
  }

  pop() {
    if (this.length <= 0) return;

    const minV = this.heap[1];
    this.heap[1] = this.heap[this.length--];

    let p = 1;
    let c = p * 2;

    while (c <= this.length) {
      if (
        c + 1 <= this.length &&
        (this.heap[c][0] > this.heap[c + 1][0] ||
          (this.heap[c][0] === this.heap[c + 1][0] &&
            this.heap[c][1] > this.heap[c + 1][1]))
      ) {
        c = c + 1;
      }

      if (
        this.heap[p][0] > this.heap[c][0] ||
        (this.heap[p][0] === this.heap[c][0] &&
          this.heap[p][1] > this.heap[c][1])
      ) {
        const tmp = this.heap[p];
        this.heap[p] = this.heap[c];
        this.heap[c] = tmp;

        p = c;
        c = p * 2;
      } else break;
    }
    return minV;
  }
}

// prettier-ignore
const tasks = [[7,10],[7,12],[7,5],[7,4],[7,2]];

const getOrder = function (tasks) {
  let ans = [];
  // 오름차순으로 정렬 + index를 추적하기 위해 index를 추가
  const sortedTasks = tasks
    .map((item, idx) => [...item, idx])
    .sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));
  
  // sortedTasks의 idx 추적용
  let idx = 0;
  // 맨 처음에 cpu에 들어갈 시간
  let currentTime = sortedTasks[idx][0];

  // currentTime보다 적은 값은 모두 heap에 넣기
  // enqueue!
  const heap = new Heap();
  while (idx < tasks.length) {
    while (idx < tasks.length && sortedTasks[idx][0] <= currentTime) {
      heap.push([sortedTasks[idx][1], sortedTasks[idx][2]]);
      idx += 1;
    }
  
    if (heap.length) {
      // 추가해서 heap에 들은 것이 있다면
      const [processingTime, currentIdx] = heap.pop();
      currentTime += processingTime;
      ans.push(currentIdx); 
    } else if (idx < tasks.length) {
      // 들은 것이 없다면
      // currentTime을 heap의 맨 처음으로 갱신
      currentTime = sortedTasks[idx][0];
    }
  }

  // 이후에 heap에 남아있던 것 모두 처리
  while (heap.length) {
    const [_, currentIdx] = heap.pop();
    ans.push(currentIdx);
  }

  return ans;
};

console.log(getOrder(tasks));
