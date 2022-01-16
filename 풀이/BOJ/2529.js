// [완전탐색]
// BOJ 2529
// https://www.acmicpc.net/problem/2529

const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const k = +input[0];
const signs = input[1].split(" ");
const answer = [];
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function recursion(i, valid, used) {
  if (i === k) {
    answer.push(valid.join(""));
    return;
  }

  if (signs[i] === '<') {
    for (const next of numbers) {
      if (!used.includes(next) && valid[i] < next) recursion(i+1, [ ...valid, next ], [ ...used, next ])
    }
  } else {
    for (const next of numbers) {
      if (!used.includes(next) && valid[i] > next) recursion(i+1, [ ...valid, next ], [ ...used, next ])
    }
  }
}

for (const n of numbers) {
  recursion(0, [n], [n]);
}

console.log(answer[answer.length - 1]);
console.log(answer[0]);