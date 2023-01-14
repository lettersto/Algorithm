// LeetCode 1061 Lexicographically Smallest Equivalent String

// union-find로 쉽게 풀기 가능
const smallestEquivalentString = function (s1, s2, baseStr) {
  const parent = {};

  for (let i = 97; i < 123; i++) {
    parent[String.fromCharCode(i)] = String.fromCharCode(i);
  }

  const find = (x) => {
    while (x !== parent[x]) {
      x = parent[x];
    }
    return x;
  };

  const union = (x, y) => {
    const xRoot = find(x);
    const yRoot = find(y);

    if (xRoot === yRoot) return;

    // charCodeAt 없어도 될듯
    if (xRoot.charCodeAt() < yRoot.charCodeAt()) {
      parent[yRoot] = xRoot;
    } else {
      parent[xRoot] = yRoot;
    }
  };

  for (let idx = 0; idx < s1.length; idx++) {
    union(s1[idx], s2[idx]);
  }

  let ans = '';
  for (const s of baseStr) {
    ans += find(parent[s]);
  }

  return ans;
};
