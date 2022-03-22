// [DP]
// BOJ 9465
// https://www.acmicpc.net/problem/9465

const [T, ...rest] = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

function solution(N, point) {
  const dp = Array.from({ length: N }, () => Array.from({ length: 3 }).fill(0));

  dp[0][0] = point[0][0];
  dp[0][1] = point[1][0];
  dp[0][2] = 0;

  for (let i = 1; i < N; i++) {
    dp[i][0] = Math.max(dp[i - 1][1], dp[i - 1][2]) + point[0][i];
    dp[i][1] = Math.max(dp[i - 1][0], dp[i - 1][2]) + point[1][i];
    dp[i][2] = Math.max(dp[i - 1][0], dp[i - 1][1], dp[i - 1][2]);
  }

  console.log(Math.max(...dp[N - 1]));
}

for (let i = 0; i < T; i++) {
  const testCase = rest.slice(3 * i, 3 * i + 3);
  const N = +testCase.shift();
  const points = testCase.map((row) => row.split(' ').map((n) => +n));
  solution(N, points);
}
