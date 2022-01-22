// [버블정렬]
// BOJ 23968
// https://www.acmicpc.net/problem/23968

const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
const [N, K] = input[0].split(" ").map(n => +n);
const arr = input[1].split(" ").map(n => +n);

function solution(num, n, k) {
  let countLeft = k;
  
  for(let i=0; i<n-1; i++) {
    for(let j=0; j<n-i-1; j++) {
      if (num[j] > num[j+1]) {
        countLeft--;
        if (countLeft === 0) {
          console.log(`${num[j+1]} ${num[j]}`);
          return;
        }
        [num[j], num[j+1]] = [num[j+1], num[j]];
      }
    }
  }
  
  countLeft && console.log(-1);
}

solution(arr, N, K);