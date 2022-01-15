// [완전탐색]
// BOJ 6603
// https://www.acmicpc.net/problem/6603

const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
const testCases = input.map(tc => tc.split(" ").slice(1));

function solution(testCase) {
  const answer = [];
  const check = Array.from({ length: testCase.length }).fill(false);

  function DFS(v) {
    if (v === testCase.length) {
      let numbers = [];
      check.forEach((checked, i) => checked && numbers.push(testCase[i]));
      if (numbers.length === 6) answer.push(numbers.join(" "));
      return;
    }

    check[v] = true;
    DFS(v+1);
    check[v] = false;
    DFS(v+1);
  }
  DFS(0);

  answer.forEach(lotto => console.log(lotto));
}

testCases.forEach(testCase => {
  solution(testCase);
  console.log('');
});