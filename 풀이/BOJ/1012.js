// [DFS]
// BOJ 1012
// https://www.acmicpc.net/problem/1012

const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
const T = Number(input.shift());

function solution(M, N, arr) {
  const farm = Array.from({ length: N }, () => Array.from({ length: M}).fill(0));
  for (const [m, n] of arr) {
    farm[n][m] = 1;
  }

  const dx = [0, 1, 0, -1];
  const dy = [-1, 0, 1, 0];
  
  function checkNearby(x, y) {
    for (let i=0; i<4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];
      if (nx >= 0 && nx < M && ny >= 0 && ny < N && farm[ny][nx]) {
        farm[ny][nx] = 0;
        checkNearby(nx, ny);
      }
    }
  }

  let worm = 0;
  for (let i=0; i<N; i++) {
    for (let j=0; j<M; j++) {
      if (farm[i][j] === 0) continue;
      worm++;
      checkNearby(j, i);
    }
  }

  console.log(worm)
} 

for(let i=0; i<T; i++) {
    const [M, N, cabbages] = input.shift().split(" ").map(Number);
    const cabbageMap = [];
    for(let j=0; j<cabbages; j++) {
        cabbageMap.push(input.shift().split(" ").map(Number));
    }
    solution(M, N, cabbageMap);
}