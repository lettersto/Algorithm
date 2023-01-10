// LeetCode 100 Same Tree

// bfs처럼 풀은 풀이
const isSameTree = function (p, q) {
  const P = [];
  const Q = [];
  if (!p && !q) {
    return true;
  }
  // !p || !q 만 조건으로 해도 되는데, 이유는 알 수 없지만 이게 더 빠르다.
  if ((!p && q) || (p && !q)) {
    return false;
  }

  P.push(p);
  Q.push(q);

  while (P.length && Q.length) {
    const curP = P.shift();
    const curQ = Q.shift();

    if (curP?.val !== curQ?.val) {
      return false;
    }

    if (curP && curQ) {
      P.push(curP.left);
      P.push(curP.right);
      Q.push(curQ.left);
      Q.push(curQ.right);
    }
  }

  return true;
};

// 재귀로 푸는 방법
// 다른 사람 풀이 참고.. 아직도 재귀적으로 사고하는 것은 어렵다.
const isSameTree2 = function (p, q) {
  if (!p && !q) {
    return true;
  }
  if ((!p && q) || (p && !q) || p?.val !== q?.val) {
    return false;
  }

  return isSameTree2(p.left, q.left) && isSameTree2(p.right, q.right);
};
