// [삽입정렬]
// BOJ 24051
// https://www.acmicpc.net/problem/24051

const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
const [N, K] = input[0].split(" ").map(n => +n);
const arr = input[1].split(" ").map(n => +n);

function solution(num, n, k) {
  let countLeft = k;
  
  for(let i=1; i<n; i++) {
    const target = num[i];
    let curPos = i-1;

    while(curPos >= 0 && target < num[curPos]) {
      countLeft--;
      if (countLeft === 0) {
        console.log(num[curPos]);
        return;
      }
      num[curPos + 1] = num[curPos];
      curPos--;
    }
    if (curPos !== i-1) {
      countLeft--;
      if (countLeft === 0) {
        console.log(target);
        return;
      }
      num[curPos + 1] = target;
    };
  }
  countLeft && console.log(-1);
}

solution(arr, N, K);