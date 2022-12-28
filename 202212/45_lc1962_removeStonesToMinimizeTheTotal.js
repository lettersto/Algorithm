// LeetCode 1962 Remove Stones to Minimize the Total
// maxHeap 문제

class Heap {
  constructor() {
    this.heap = [null];
    this.last = 0;
    this._sumV = 0;
  }

  get length() {
    return this.last;
  }

  get sumV() {
    return this._sumV;
  }

  heappush(val) {
    this.last += 1;
    this.heap[this.last] = val;
    this._sumV += val;

    let child = this.last;
    let parent = Math.floor(child / 2);

    while (parent >= 1) {
      if (this.heap[parent] < this.heap[child]) {
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
    if (this.length === 0) {
      return;
    }
    const maxV = this.heap[1];
    this.heap[1] = this.heap[this.last];
    this.last -= 1;
    this._sumV -= maxV;

    let parent = 1;
    let child = parent * 2;

    while (child <= this.last) {
      if (child + 1 <= this.last && this.heap[child + 1] > this.heap[child]) {
        child = child + 1;
      }

      if (this.heap[parent] < this.heap[child]) {
        const tmp = this.heap[parent];
        this.heap[parent] = this.heap[child];
        this.heap[child] = tmp;

        parent = child;
        child = parent * 2;
      } else break;
    }
    return maxV;
  }
}

const minStoneSum = function (piles, k) {
  const heap = new Heap();
  piles.forEach((i) => heap.heappush(i));

  for (let i = 0; i < k; i++) {
    const tmp = heap.heappop();
    heap.heappush(Math.ceil(tmp / 2));
  }

  return heap.sumV;
};
