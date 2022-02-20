// [stack]
// BOJ 9935
// https://www.acmicpc.net/problem/9935

const [STRING, BOMB] = require("fs").readFileSync("/dev/stdin").toString().split("\n");

function bomb(str, bomb) {
  const stack = [];

  for(let i=0; i<str.length; i++) {
    stack.push(str[i]);

    if (stack.length >= bomb.length && str[i] === bomb[bomb.length - 1]) {
      let L = bomb.length;
      let isBomb = false;
      
      for(let j=0; j<L; j++) {
        if (stack[stack.length - 1- j] !== bomb[bomb.length - 1 - j]) break;
        if (j !== L - 1) continue;
        isBomb = true;
      }

      if (isBomb) {
        for(let k=0; k<L; k++) stack.pop();
      }
    }
  }

  console.log(stack.length ? stack.join('') : 'FRULA');
}

bomb(STRING, BOMB);