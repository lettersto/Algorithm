// 프로그래머스 프로세스

// 큐인데 처음에 linkedlist를 구현해서 한 것보다
// 그냥 array api를 사용하는 것이 훨씬 빠르다.
// 최적화 되어 나와있는 api가 역시 진리인가보다...
class Node {
  constructor(val, pos) {
    this.val = val;
    this.pos = pos;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push(val, pos) {
    const newNode = new Node(val, pos);

    if (this.size == 0) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }
    this.tail = newNode;
    this.size += 1;
  }

  shift() {
    if (this.size == 0) {
      return;
    }

    const tmp = this.head;
    this.head = this.head.next;
    if (!this.head) {
      this.tail = null;
    }
    this.size -= 1;

    return [tmp.val, tmp.pos];
  }
}

function solution(priorities, location) {
  const maxPriority = 10;
  const queue = new LinkedList();
  const priorityCounter = Array.from({length: maxPriority}, () => 0);
  const isHighestPriority = (priority) => {
    for (let p = priority + 1; p < maxPriority; p++) {
      if (priorityCounter[p] !== 0) {
        return false;
      }
    }
    return true;
  };

  for (let i = 0; i < priorities.length; i++) {
    queue.push(priorities[i], i);
    priorityCounter[priorities[i]] += 1;
  }

  let order = 0;

  while (queue.size > 0) {
    const [curVal, curPos] = queue.shift();
    if (isHighestPriority(curVal)) {
      order += 1;
      priorityCounter[curVal] -= 1;
      if (curPos == location) {
        return order;
      }
    } else {
      queue.push(curVal, curPos);
    }
  }

  return order;
}

// 그냥 array를 사용한 버전
function solution2(priorities, location) {
  const maxPriority = 10;
  const queue = [];
  const priorityCounter = Array.from({length: maxPriority}, () => 0);
  const isHighestPriority = (priority) => {
    for (let p = priority + 1; p < maxPriority; p++) {
      if (priorityCounter[p] !== 0) {
        return false;
      }
    }
    return true;
  };

  for (let i = 0; i < priorities.length; i++) {
    queue.push([priorities[i], i]);
    priorityCounter[priorities[i]] += 1;
  }

  let order = 0;

  while (queue.length > 0) {
    const [curVal, curPos] = queue.shift();
    if (isHighestPriority(curVal)) {
      order += 1;
      priorityCounter[curVal] -= 1;
      if (curPos == location) {
        return order;
      }
    } else {
      queue.push([curVal, curPos]);
    }
  }

  return order;
}
