// [그리디]
// BOJ 11047
// https://www.acmicpc.net/problem/11047

const [fl, ...arr] = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
const [, K] = fl.split(" ").map(n => +n);
const coinArr = arr.map(n => +n);

function solution(target, coins) {
  coins.sort((a, b) => b - a);
  let sum = 0;
  let cnt = 0;
  
  for(const coin of coins) {
    while(sum + coin <= target ) {
      sum += coin;
      cnt++;
    }
    if(sum === target) {
      console.log(cnt);
      return;
    }
  }
}

solution(K, coinArr);