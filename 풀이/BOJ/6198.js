// [stack]
// BOJ 6198
// https://www.acmicpc.net/source/39440036

const [n, ...arr] = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(n);
const buildingHeights = arr.map(n => Number(n));

function solution(N, heights) {
  let count = 0;
  const stack = [];
  for(let i=0; i<N; i++) {
    if (heights[i] >= heights[stack[stack.length - 1]]) {
      while(heights[stack[stack.length - 1]] <= heights[i]) {
        stack.pop();
      }
    }
    count += stack.length;
    stack.push(i);
  }
  console.log(count);
}

solution(N, buildingHeights);