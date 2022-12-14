// LeetCode 152 Maximum Product Subarray
// 백준 1912 연속합과 똑같이 풀면 될 줄 알았지만
// 음수와 곱하기가 함께 있어 불가능 :(

// 틀린 풀이
// 반례 [-2, 3, -4], expected 24, output 3
const maxProduct1 = (nums) => {
  const dp = new Array(nums.length).fill(0);
  dp[0] = nums[0];

  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1] * nums[i], nums[i]);
  }

  return Math.max(...dp);
};

// 곱은 언제 양수가 될지 모르므로
// 절대값이 크도록 유지
// 곱의 결과값이 양수인 경우 max를 저장하고
// 곱의 결과값이 음수인 경우 min 값을 저장

const maxProduct = (nums) => {
  const N = nums.length;
  const dp = new Array(N).fill(0).map(() => [0, 0]);
  dp[0][nums[0] >= 0 ? 1 : 0] = nums[0];

  for (let i = 1; i < N; i++) {
    if (nums[i] >= 0) {
      dp[i][0] = Math.min(dp[i - 1][0] * nums[i], nums[i]);
      dp[i][1] = Math.max(dp[i - 1][1] * nums[i], nums[i]);
    } else {
      dp[i][0] = Math.min(dp[i - 1][1] * nums[i], nums[i]);
      dp[i][1] = Math.max(dp[i - 1][0] * nums[i], nums[i]);
    }
  }

  let maxV = nums[0];
  for (let i = 0; i < N; i++) {
    if (dp[i][0] < 0) {
      maxV = Math.max(maxV, dp[i][0]);  // [-2]
    }
    if (!(dp[i][1] === 0 && nums[i] < 0)) {
      maxV = Math.max(maxV, dp[i][1]);
    }
  }

  return maxV;
};

// 다른 사람 풀이 개선
// memory는 적게 먹는데 시간은 더 느리다.
// 시간이 느린 이유는 아래 4, 5 함수에서 볼 수 있다.
// 무조건 곱할 수록 숫자는 커져가는 것을 이용해
// max와 min 두 값만 유지
const maxProduct3 = (nums) => {
  let maxV = nums[0];
  let curMin = 1;
  let curMax = 1;

  for (const n of nums) {    
    [curMax, curMin] =[
      Math.max(n * curMax, n * curMin, n), 
      Math.min(n * curMax, n * curMin, n),
    ];
    maxV = Math.max(maxV, curMax);
  }

  return maxV;
};

// for를 of에서 가장 기본 for loop로 돌렸더니 속도가 더 빨라졌다.
// 이유는 아직 찾지 못했다. javascript engine의 차이일 가능성도 있다.
// 아니면 of로는 value값만 뽑아내야 하니 무언가 한 단계 더 거쳐야 할지도?

const maxProduct4 = (nums) => {
  let maxV = nums[0];
  let curMin = 1;
  let curMax = 1;

  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];    
    [curMax, curMin] =[
      Math.max(n * curMax, n * curMin, n), 
      Math.min(n * curMax, n * curMin, n),
    ];
    maxV = Math.max(maxV, curMax);
  }

  return maxV;
};

// destructuring을 이용한 swap은 속도도 느리고 메모리도 많이 먹었다
// 항상 편리해서 그냥 쓰고 있었는데 무슨 일인지 모르겠다.
// https://codeburst.io/es6s-function-destructuring-assignment-is-not-free-lunch-19caacc18137
// 위의 설명은 byteCode까지 내려가서 아직 잘 이해되지 않지만
// 나중에 다시 보면 좋을 것 같아 기록
// destructuring 자체가 byte code를 엄청 생성시킨다는 내용인 것은 틀림없다

const maxProduct5 = (nums) => {
  let maxV = nums[0];
  let curMin = 1;
  let curMax = 1;

  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];
    const tmpMax = curMax; 
    curMax = Math.max(n * curMax, n * curMin, n);
    curMin = Math.min(n * tmpMax, n * curMin, n);
    maxV = Math.max(maxV, curMax);
  }

  return maxV;
};
