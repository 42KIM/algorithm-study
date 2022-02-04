// [그리디]
// BOJ 1541
// https://www.acmicpc.net/problem/1541

const input = require("fs").readFileSync("/dev/stdin").toString();

function solution(equation) {
  console.log(
    equation.split('-')
    .map(eq => eq.split('+').reduce((a, b) => Number(a) + Number(b), 0))
    .reduce((a, b) => a - b)
  );
}

solution(input);