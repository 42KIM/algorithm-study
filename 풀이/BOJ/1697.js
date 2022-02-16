// [DFS/BFS]
// BOJ 1697
// https://www.acmicpc.net/problem/1697

const [N, K] = require('fs').readFileSync('/dev/stdin').toString().trim().split(' ').map(Number);

function solution(subin, sister) {
  const visited = Array.from({ length: 100001 }).fill(false);
  visited[subin] = true;
  const queuePos = [subin];
  const queueTime = [0]
  let res;

  let pointer = 0;
  while(pointer < queuePos.length) {
    const curPos = queuePos[pointer];  
    const curTime = queueTime[pointer++]
    if (curPos === sister) {
      res = curTime;
      break;
    }
    
    if (curPos - 1 >= 0 && !visited[curPos - 1]) {
        queuePos.push(curPos - 1);
        queueTime.push(curTime + 1);
        visited[curPos - 1] = true;
    };
    if (curPos + 1 <= 100000 && !visited[curPos + 1]) {
        queuePos.push(curPos + 1);
        queueTime.push(curTime + 1);
        visited[curPos + 1] = true;
    };
    if (curPos * 2 <= 100000 && !visited[curPos * 2]) {
        queuePos.push(curPos * 2);
        queueTime.push(curTime + 1);
        visited[curPos * 2] = true;
    };
  }
    
  console.log(res);
}
solution(N, K);