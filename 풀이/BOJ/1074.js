// [재귀]
// BOJ 1074
// https://www.acmicpc.net/problem/1074

const input = require("fs").readFileSync("/dev/stdin").toString().split(" ").map(n => +n);

function solution(N, r, c) {
  let count = 0;  

  function countOrder(x, y) {
      if (r === x && c === y + 1) count += 1;
      else if (r === x + 1 && c === y) count += 2;
      else if (r === x + 1 && c === y + 1) count += 3;
  }

  function recursion(n, startX, startY) {
      const halfLength = Math.pow(2, n-1);
      
      if (halfLength === 1) countOrder(startX, startY);
      else {
          if (r < startX + halfLength && c < startY + halfLength) {
              recursion(n-1, startX, startY);
          }
          else if (r < startX + halfLength && c >= startY + halfLength) {
              count += (halfLength ** 2);
              recursion(n-1, startX, startY + halfLength)
          }
          else if (r >= startX + halfLength && c < startY + halfLength) {
              count += 2 * (halfLength ** 2);
              recursion(n-1, startX + halfLength, startY);
          }
          else if (r >= startX + halfLength && c >= startY + halfLength) {
              count += 3 * (halfLength ** 2);
              recursion(n-1, startX + halfLength, startY + halfLength);
          }
      }

  }
  recursion(N, 0, 0);

  console.log(count);
}

solution(input[0], input[1], input[2]);