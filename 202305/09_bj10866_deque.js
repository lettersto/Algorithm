class Node {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class LinkedList {
  #size = 0;
  #head = null;
  #tail = null;

  get size() {
    return this.#size;
  }

  get isEmpty() {
    return this.#size === 0 ? 1 : 0;
  }

  get front() {
    return this.#head ? this.#head.val : -1;
  }

  get back() {
    return this.#tail ? this.#tail.val : -1;
  }

  unshift(val) {
    const newNode = new Node(val);

    if (this.#size === 0) {
      this.#tail = newNode;
    } else {
      newNode.next = this.#head;
      this.#head.prev = newNode;
    }

    this.#head = newNode;
    this.#size += 1;
  }

  push(val) {
    const newNode = new Node(val);

    if (this.#size === 0) {
      this.#head = newNode;
    } else {
      newNode.prev = this.#tail;
      this.#tail.next = newNode;
    }

    this.#tail = newNode;
    this.#size += 1;
  }

  shift() {
    if (this.#size === 0) {
      return -1;
    }

    const shiftedNode = this.#head;
    const nextNode = this.#head.next;

    this.#head = nextNode;

    if (nextNode) {
      nextNode.prev = null;
    } else {
      this.#tail = null;
    }

    this.#size -= 1;
    return shiftedNode.val;
  }

  pop() {
    if (this.#size === 0) {
      return -1;
    }

    const poppedNode = this.#tail;
    const prevNode = this.#tail.prev;

    this.#tail = prevNode;

    if (prevNode) {
      prevNode.next = null;
    } else {
      this.#head = null;
    }

    this.#size -= 1;

    return poppedNode.val;
  }
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
const [N, ...commands] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(/(?:\r)*?\n/);

const ans = [];
const list = new LinkedList();

for (let i = 0; i < +N; i++) {
  const [cmd, num] = commands[i].split(' ');
  if (cmd === 'push_back') {
    list.push(+num);
  }

  if (cmd === 'push_front') {
    list.unshift(+num);
  }

  if (cmd === 'pop_front') {
    ans.push(list.shift());
  }

  if (cmd === 'pop_back') {
    ans.push(list.pop());
  }

  if (cmd === 'size') {
    ans.push(list.size);
  }

  if (cmd === 'empty') {
    ans.push(list.isEmpty);
  }

  if (cmd === 'front') {
    ans.push(list.front);
  }

  if (cmd === 'back') {
    ans.push(list.back);
  }
}

console.log(ans.join('\n'));
