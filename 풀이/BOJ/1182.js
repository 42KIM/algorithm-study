// [재귀]
// BOJ 1182
// https://www.acmicpc.net/problem/1182

const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
const [N, S] = input[0].split(" ").map(n => +n);
const numbers = input[1].split(" ").map(n => +n);

function solution(N, S, numbers) {
    let count = 0;
    const totalNum = numbers.length;
    
    function checkSum(idx, sum) {
        if (idx === totalNum) {
            if (sum === S) count++;
        } else {
            checkSum(idx+1, sum+numbers[idx]);
            checkSum(idx+1, sum);
        }
    }
    checkSum(0, 0);
    
    console.log(S === 0 ? count - 1 : count);
}

solution(N, S, numbers);