// [완전탐색]
// BOJ 7490
// https://www.acmicpc.net/problem/7490

const [_, ...arr] = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

function solution(N) {
  const answer = [];

  function recursion(i, equation, num) {
    if (i === N) {
      if (num.reduce((acc, cur) => acc + cur, 0) === 0) answer.push(equation);
      return;
    }

    recursion(i+1, equation + `+${i+1}`, [...num, i+1]);
    recursion(i+1, equation + `-${i+1}`, [...num, (-1)*(i+1)]);
    const prev = num.pop();
    const next = prev < 0 ? prev * 10 - (i+1) : prev * 10 + (i+1);
    recursion(i+1, equation + ` ${i+1}`, [...num, next]);
  }
  recursion(1, '1', [1]);

  answer.sort().forEach(eq => console.log(eq));
}

for(const n of arr) {
  solution(+n);
  console.log('');
}