// [DFS/BFS]
// 프로그래머스 '전력망을 둘로 나누기'
// https://programmers.co.kr/learn/courses/30/lessons/86971

function solution(n, wires) {
  let min = Number.MAX_SAFE_INTEGER;
  const connection = Array.from({ length: n+1 }, () => Array());
  for(const [s, e] of wires) {
      connection[s].push(e);
      connection[e].push(s);
  }

  function _BFS(startNode, disconnectedNode) {
      const checked = Array.from({ length: n+1 }, () => false);
      const queue = [disconnectedNode];
      let count = 1;

      checked[disconnectedNode] = true;
      while(queue.length) {
          const cur = queue.shift();
          for(let i=0; i<connection[cur].length; i++) {
              if (connection[cur][i] === startNode || checked[connection[cur][i]]) continue;
              checked[connection[cur][i]] = true;
              count++;
              queue.push(connection[cur][i]);
          }
      }
      return count;
  }

  for(let i=1; i<=n; i++) {
      for(let j=0; j<connection[i].length; j++) {
          const isolatedNodes = _BFS(i, connection[i][j]);
          const diff = Math.abs(isolatedNodes - (n - isolatedNodes));
          min = Math.min(min, diff);
      }
  }

  return min;
}

// 연결된 전선을 하나씩 끊는다.
// 끊긴 노드에 연결된 노드의 총 개수를 구한다. (isolatedNodes)
// 전체에서 isolatedNodes를 뺀 개수는 나머지 연결된 노드의 수이다.
// 두 수의 차의 절대값을 구한다.
// 가장 작은 절대값을 구한다.