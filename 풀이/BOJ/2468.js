// [완전탐색]
// BOJ 2468
// https://www.acmicpc.net/problem/2468

const [N, ...arr] = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
const matrix = arr.map(row => row.split(" ").map(n => +n));
const limits = new Set(matrix.flat());

function solution(N, matrix, limits) {
  let answer = 1;

  for (const limit of limits) {
    let count = 0;
    const board = matrix.map(row => row.slice());
    const dx = [-1, 0, 1, 0];
    const dy = [0, 1, 0, -1];
    
    for (let i=0; i<N; i++) {
      for (let j=0; j<N; j++) {
        if (board[i][j] <= limit) board[i][j] = 0;
      }
    }

    const queue = [];
    for (let k=0; k<N; k++) {
      for (let l=0; l<N; l++) {
        if (board[k][l]) {
          board[k][l] = 0;
          count++;
          queue.push([k, l]);

          while (queue.length) {
            let [x, y] = queue.shift();
            for (let m=0; m<4; m++) {
              let nx = x + dx[m];
              let ny = y + dy[m];

              if (nx>=0 && nx<N && ny>=0 && ny<N && board[nx][ny]) {
                board[nx][ny] = 0;
                queue.push([nx, ny]);
              }
            }
          }
        }
      }
    }
    answer = Math.max(answer, count);
  }

  console.log(answer);
}

solution(+N, matrix, limits);