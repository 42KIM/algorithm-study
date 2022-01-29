// [정렬]
// BOJ 18872
// https://www.acmicpc.net/problem/18870

const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
const arr = input[1].split(" ").map(n => +n);

function solution(num) {
  const answer = [];
  const sorted = Array.from(new Set(num.slice().sort((a, b) => a - b)));
  const sortedMap = Object.fromEntries(sorted.map((n, i) => [n, i]));
  for (const n of num) {
    answer.push(sortedMap[n]);
  }
  console.log(answer.join(" "));
}
solution(arr);