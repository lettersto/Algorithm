// LeetCode 332 Reconstruct Itinerary

// edge를 모두 사용해야 끝나는 그래프 문제
// 같은 edge가 여러 개 있을 수 있기 때문에,
// visit을 일반적인 visit으로 하지 않고 숫자로 방문 여부 체크
// 방문하면 -= 1, visit이 0이 되면 이용할 수 있는 edge가 없으니 못 가도록

const findItinerary = function (tickets) {
  const E = tickets.length;
  const adj = {JFK: []};
  const visit = {};

  for (let e = 0; e < E; e++) {
    const [start, end] = tickets[e];
    adj.hasOwnProperty(start) || (adj[start] = []);
    adj.hasOwnProperty(end) || (adj[end] = []);
    visit[`${start}-${end}`] || (visit[`${start}-${end}`] = 0);

    adj[start].push(end);
    visit[`${start}-${end}`] += 1;
  }

  for (const key in adj) {
    adj[key].sort();
  }

  let ans = [];

  const dfs = (curAirport, itinerary, edgeCnt) => {
    if (edgeCnt === E) {
      ans = [...itinerary];
      return true;
    }

    for (const newAirport of adj[curAirport]) {
      if (visit[`${curAirport}-${newAirport}`] === 0) {
        continue;
      }
      visit[`${curAirport}-${newAirport}`] -= 1;
      if (dfs(newAirport, [...itinerary, newAirport], edgeCnt + 1)) {
        return true;
      }
      visit[`${curAirport}-${newAirport}`] += 1;
    }
  };

  dfs('JFK', ['JFK'], 0);

  return ans;
};

// 다른 사람 풀이 => Eulerian Circuit
// 한붓그리기를 생각해보자
// 무조건 알파벳 순서에서 가장 적은 알파벳이 있는 곳으로 이어 나간다.
// 모든 간선을 방문해야 하기 때문에 가능한 방법

const findItinerary2 = function (tickets) {
  const adj = {};
  const res = [];

  for (let i = 0; i < tickets.length; i++) {
    const [start, end] = tickets[i];
    adj[start] ? adj[start].push(end) : (adj[start] = [end]);
  }

  for (const key in adj) {
    adj[key].sort();
  }

  const dfs = (curAirport) => {
    const nextAirports = adj[curAirport];
    while (nextAirports && nextAirports.length > 0) {
      dfs(nextAirports.shift());
    }
    res.push(curAirport); // 순서가 거꾸로 들어가게 됨
  };

  dfs('JFK');

  return res.reverse();
};
