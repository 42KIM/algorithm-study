// [정렬]
// BOJ 1026
// https://www.acmicpc.net/problem/1026

const [N, ...arr] = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
const A = arr[0].split(" ").map(n => +n);
const B = arr[1].split(" ").map(n => +n);

function solution(N, A, B) {
  let S = 0;
  const aArray = A.slice().sort((a, b) => a - b);
  const bIndexArray = Array.from({ length: N }, (_,i) => i).sort((a, b) => B[b] - B[a]);
  for(let i=0; i<N; i++) {
    S += aArray[i] * B[bIndexArray[i]]
  }
  console.log(S)
}
solution(+N, A, B);