const n = Number(require("fs").readFileSync("/dev/stdin").toString());

function solution(N) {
  const dy = Array.from({ length: N + 1}, () => 0n);
  dy[1] = 3;
  dy[2] = 7;
  
  for(let i=3; i<=N; i++) {
    dy[i] = (2*dy[i-1] + dy[i-2]) % 9901;
  }
  
  console.log(dy[N]);
}

solution(n);