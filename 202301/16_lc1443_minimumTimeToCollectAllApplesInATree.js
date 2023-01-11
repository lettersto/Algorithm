// LeetCode 1443 Minimum Time to Collect All Apples in a Tree

// 트리는 어렵지만 dp처럼 시간을 들여도 풀리지 않는 것은 아니라서 다행이다.

const tree = Array.from({length: n}, () => []);
const visit = Array.from({length: n}, () => false);

// 1. edge 관계로 tree 생성
for (const [v1, v2] of edges) {
  tree[v1].push(v2);
  tree[v2].push(v1);
}

// 2. 모든 트리를 한 번만 방문하기 위해 visit 이용
// 한 번만 그래프를 순회하기 위해 시작지점인 0은 이미 방문한 것으로 표시
visit[0] = true;

// 3. 재귀
const collectApples = (curV) => {
  // 3 - 1. 어떤 노드의 child 노드 중 하나라도
  // 사과를 보유하고 있는지 체크하기 위한 변수 route
  let route = 0; 

  // 3 - 3. current node의 children 탐색
  for (const neiV of tree[curV]) {
    if (visit[neiV]) continue;
    visit[neiV] = true;
    // child 중 하나라도 사과를 갖고 있다면
    // route가 이를 통해 1 이상으로 변할 것
    route += collectApples(neiV);
  }

  // 3 - 5. current node가 0이라면
  // 모든 트리를 갔다 온 것이므로 바로 모인 route를 return하면 된다.
  if (curV === 0) {
    return route;
  }

  // 3 - 4. current node의 child 중에서
  // 하나라도 apple을 갖고 있는 경우 (자신 위치에 사과가 있는지와 상관 없이)
  // 무조건 이 경로는 지나가게 된다.
  // route += 1
  if (route) {
    return route + 1;
  }

  // 3 - 2. 자신의 child 중 하나라도 사과를 갖고 있지 않은 경우 (+ 리프 노드인 경우 포함)
  // 자기 자신의 위치에 사과가 있으면 1, 없으면 0 return
  return hasApple[curV] ? 1 : 0;
};

// 4. 현재 route는 돌아오는 것을 고려하지 않았으므로
// 왕복으로 바꾸기 위해 * 2
console.log(collectApples(0) * 2);
