// LeetCode 2244 Minimum Rounds to Complete All Tasks

// 1. tasks의 순서는 상관없기 때문에, 난이도가 같은 tasks끼리 묶어 각 난이도마다 몇 개씩 존재하는지 센다.
// Counter object를 만들어 주면 된다.

// 2. tasks는 2나 3 단위로 잘라서 수행이 가능하다.
// 즉, 2나 3을 더해 만들 수 있는 숫자여야 각 task를 수행 가능하다.
// a) task는 3으로 나눠진다면 3으로 나누는 것이 빠르게 해결하는 방법이다.
// 3으로 나눠지지 않는 수일 때 2로 묶어본다.
// b) 2와 3은 차이가 1이기 때문에 2이상의 모든 숫자를 만들 수 있다.
// 1 이하의 수는 2나 3으로 절대 만들 수 없기 때문에 무조건 -1을 return한다.
// 1  2  3  4  5  6  7  8  9  10
//-1  
// (base line) 2는 2 하나, 3은 3 하나로 만들어질 때
// 1  2  3  4  5  6  7  8  9  10
//-1  1  1
// 3으로 나눈 값으로 먼저 cnt를 채우고
// 1  2  3  4  5  6  7  8  9  10
//-1  1  1        2        3
// 나머지 숫자를 2를 추가해 만들어 본다.
// 1  2  3  4  5  6  7  8  9  10
//-1  1  1  2  2  2  3  3  3  4
// 그러면 2이상의 숫자는 Math.ceil(cnt/ 3)을 만족하는 것을 알 수 있다.

const minimumRounds = function(tasks) {
  const tasksCnt = {};
  for (let i = 0; i < tasks.length; i++) {
    tasksCnt[tasks[i]] = tasks[i] in tasksCnt ? tasksCnt[tasks[i]] + 1 : 1;
  }
  
  let ans = 0;
  for (const cnt of Object.values(tasksCnt)) {
    if (cnt <= 1) {
      return -1;
    }
    ans += Math.ceil(cnt / 3);
  }
  return ans;
};
