// [선택정렬]
// BOJ 23881
// https://www.acmicpc.net/problem/23881

const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
const [N, K] = input[0].split(" ").map(n => +n);
const arr = input[1].split(" ").map(n => +n);

function solution(num, n, k) {
  let countLeft = k;
  
  for(let i=n-1; i>=1; i--) {
      let maxIdx = i;
      for(let j=i-1; j>=0; j--) {
          if (num[j] > num[maxIdx]) {
              maxIdx = j;
          }
      }
      if (maxIdx !== i) {
        countLeft--;
        if (countLeft === 0) {
          console.log(`${num[i]} ${num[maxIdx]}`);
          return;
        }
        [num[i], num[maxIdx]] = [num[maxIdx], num[i]];
      }
  }
  
  countLeft && console.log(-1);
}

solution(arr, N, K);