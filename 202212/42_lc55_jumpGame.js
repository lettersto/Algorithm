// 1.BFS 메모리 초과
class Node {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class Deque {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  get size() {
    return this.length;
  }

  push(val) {
    const newNode = new Node(val);
    if (!this.length) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
    }
    this.tail = newNode;
    this.length += 1;
  }

  shift() {
    if (!this.length) {
      return;
    }
    const tmp = this.head;
    this.head = this.head.next;
    if (this.head) {
      this.head.prev = null;
    }
    this.length -= 1;
    return tmp.val;
  }
}

const canJump = function (nums) {
  const N = nums.length;
  const visit = new Array(N).fill(false);
  const Q = new Deque();
  Q.push(0);
  visit[0] = true;

  while (Q.size) {
    const curV = Q.shift();
    if (curV >= N - 1) {
      return true;
    }

    for (let i = 0; i < nums[curV] + 1; i++) {
      const newV = curV + i;
      if (newV > N - 1 || (newV <= N - 1 && !visit[newV])) {
        Q.push(newV);
        if (newV <= N - 1) {
          visit[newV] = true;
        }
      }
    }
  }
  return false;
};

// 2. BFS 그냥 js array를 쓰면 시간 초과

// 3. DP ?
// 0이 없으면 반드시 마지막 index에 도달 가능
// 0 하나라도 array에 있는 순간 체크 필요
// 0이 연달아 있는 수보다, 이 0들 앞에 있는 수가 더 커야만 0을 뛰어 넘을 수 있다
// 1. 0이 보이면 cnt += 1 시작
//    a. 0을 만난 이후, 0이 아닌 숫자를 만나더라도 해당 숫자로 0을 뛰어 넘을 수 없다면 cnt += 1;
//       그 숫자들까지 뛰어 넘야야 하기 때문
// 2. 뛰어 넘는 숫자를 만난다면 cnt = 0으로 초기화
// 모두 다 순회했는데도 cnt가 남아 있는 게 있다면, 0을 뛰어넘지 못한 것이므로 끝에 도달 X
// O(n)
const canJump2 = function (nums) {
  let cnt = 0;
  for (let i = nums.length - 2; i >= 0; i--) {
    if (nums[i] === 0 || (cnt && cnt + 1 > nums[i])) {
      cnt += 1;
    } else {
      cnt = 0;
    }
  }
  return cnt ? false : true;
};
