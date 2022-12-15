// 백준 1700 멀티탭 스케줄링

const fs = require('fs');

let [NM, arr] = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString().trim()
    : `2 7
2 3 2 3 1 2 7`
).split('\n');

const [N, M] = NM.split(' ').map(Number);
arr = arr.split(' ').map(Number);

const outlet = new Set();
let cnt = 0;

// 플러그 꽂기
for (let i = 0; i < M; i++) {
  if (outlet.size + 1 <= N) {
    // 멀티탭에 공간이 남은 경우 - 그냥 꽂기
    outlet.add(arr[i]);
  } else {
    // 멀티탭에 공간이 없는 경우
    // 이미 꽂혀 있는 전자기기인 경우
    if (outlet.has(arr[i])) {
      continue;
    }
    // 이미 꽂혀 있는 전자기기가 아닌 경우
    // 멀티탭에 꽂혀 있는 전자기기 중
    // 가장 순서가 늦게 돌아오는 전자기기 고르기
    let lastDevice = 0;
    let lastIdx = 0;
    for (const device of outlet) {
      let found = false;
      for (let di = i + 1; di < M; di++) {
        if (device === arr[di]) {
          if (lastIdx < di) {
            lastIdx = di;
            lastDevice = device;
          }
          found = true;
          break;
        }
      }
      if (!found) {
        // 순서에서 찾지 못한 경우 그것을 바로 뽑으면 된다
        lastDevice = device;
        break;
      }
    }
    outlet.delete(lastDevice);  // 빼기
    outlet.add(arr[i]);  // 꽂기
    cnt += 1;
  }
}

console.log(cnt);
