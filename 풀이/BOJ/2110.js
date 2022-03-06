// [이분 탐색]
// BOJ 2110
// https://www.acmicpc.net/problem/2110

const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');
const [N, C] = input[0].split(' ').map(Number);
const houses = input.slice(1).map(Number);

function solution(N, C, house) {
  let answer;
  house.sort((a, b) => a - b);
  let start = 1;
  let end = house[N - 1] - house[0];

  while (start <= end) {
    let gap = Math.floor((start + end) / 2);
    let leftIptime = C - 1;
    let prevHouse = 0;
    for (let i = 1; i < N; i++) {
      if (leftIptime && house[i] - house[prevHouse] >= gap) {
        prevHouse = i;
        leftIptime--;
      }
    }
    if (leftIptime) {
      end = gap - 1;
    } else {
      answer = gap;
      start = gap + 1;
    }
  }
  return answer;
}

console.log(solution(N, C, houses));
