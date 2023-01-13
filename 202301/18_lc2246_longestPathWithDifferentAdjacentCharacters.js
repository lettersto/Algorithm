// LeetCode 2246 Longest Path With Different Adjacent Characters

const longestPath = function (parent, s) {
  const N = parent.length;

  // 1. parent로 child를 알 수 있는 tree 생성
  const tree = Array.from({ length: N }, () => []);
  for (let child = 1; child < N; child++) {
    tree[parent[child]].push(child);
  }

  // 2. 가장 긴 연속하는 길이를 저장할 변수 ans
  //    아무리 짧은 트리라 하더라도 자기 자신을 포함해 길이가 1이기 때문에, 1로 초기화
  let ans = 1;

  // 3. DFS 로 트리 순회
  const traversal = (parent) => {

    // 3 - 1. parent를 root로 하는 subtree의 가지 중 가장 긴 값을 기록할 curMaxLength
    //        (base case) leaf node인 경우에는 자기 자신 밖에 없기 때문에 1로 초기화
    let curMaxLength = 1;

    // 3 - 2. child마다 root로 하는 가장 긴 길이를 return해서 가져오기
    for (const child of tree[parent]) {
      let maxLengthOfChild = traversal(child);

      // 3 - 3. parent와 child 간에 알파벳이 같으면 아래 연산은 건너 뛰기
      //        하지만, 이 child를 root로 하는 subtree에서 가장 긴 것이 나타날 수 있기 때문에
      //        child로 순회는 계속해야 한다. 그렇기 때문에 continue가 traversal(child) 뒤에 온다.
      if (s[parent] === s[child]) continue;
      
      // 3 - 4. ans 값과 curMaxLength 갱신
      //        ans는 parent의 이전 branch 중의 max값과 + 현재 child를 기준으로 하는 새로운 브랜치의 max값
      //        curMaxLength는 현재까지 child를 root로 하는 subtree 중 max 값
      ans = Math.max(ans, curMaxLength + maxLengthOfChild);
      // 이때 maxLengthOfchild + 1인 이유는, curMaxLength는 항상 branch + parent(1)이지만,
      // 새 branch는 parent를 포함하지 않은 상태이기 때문
      curMaxLength = Math.max(curMaxLength, maxLengthOfChild + 1);
    }

    return curMaxLength;
  };

  traversal(0);

  return ans;
};
