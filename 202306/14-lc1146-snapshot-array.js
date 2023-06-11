// LeetCode 1146. Snapshot Array

// 그냥 snap할 때마다 array 전체를 저장했더니 메모리 초과 발생한 문제
// snap 할 때 전체 array가 아닌 변경된 index만 저장 (snapId, 갱신된 value)
// 찾을 때는 binary search 이용해서 index에서 nlogn으로 찾기

class SnapshotArray {
  constructor(length) {
    this.arr = new Array(length).fill(0);
    this.snapshot = Array.from({length}, () => [[0, 0]]);
    // [index[[snapId, snapValue], [snapid, snapValue], ...]]
    this.snapId = 0; // -1번부터 하면 set할 때 비교가 까다로워짐
  }

  set(index, val) {
    this.arr[index] = val;
    const lastIdx = this.snapshot[index].length - 1;

    if (this.snapshot[index][lastIdx][0] === this.snapId) {
      this.snapshot[index][lastIdx] = [this.snapId, val];
    }
    if (this.snapshot[index][lastIdx][0] < this.snapId) {
      this.snapshot[index].push([this.snapId, val]);
    }
  }

  // snapId를 올리기만 하는 함수
  snap() {
    this.snapId += 1;
    return this.snapId - 1;
  }

  get(index, snapId) {
    const historyIdx = this.binarySearch(this.snapshot[index], snapId);
    return this.snapshot[index][historyIdx][1];
  }

  // upperbound로 가장 근사한 snapId찾기
  binarySearch(history, snapId) {
    let left = 0;
    let right = history.length - 1;
    let idx = 0;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (history[mid][0] > snapId) {
        right = mid - 1;
      } else {
        left = mid + 1;
        idx = Math.max(idx, mid);
      }
    }

    return idx;
  }
}
