// LeetCode 2279 Maximum Bags With Full Capacity of Rocks
// 웬일로 쉽나 했더니 역시 dp가 아니었다.

const maximumBags = function(capacity, rocks, additionalRocks) {
  const N = capacity.length;
  
  // 1. capacity - rocks
  for (let i = 0; i < N; i++) {
    capacity[i] = capacity[i] - rocks[i];
  }

  // 2. sort - 순서 상관없으니 최대한 많이 넣는 방향으로 가기 위해 sort
  capacity.sort((a, b) => a - b);
  
  // 3. 앞에서부터 추가할 수 있는 돌의 양을 추적하며 숫자 세기
  //    0이면 이미 full capacity 이므로 바로 cnt +=1하고 패스
  let cnt = 0;
  for (let i = 0; i < N; i++) {
    if (!capacity[i]) {
      cnt += 1;
    } else {
      if (additionalRocks < capacity[i]) {
        break;
      }
      additionalRocks -= capacity[i];
      cnt += 1;
    }
  }

  return cnt;
};
