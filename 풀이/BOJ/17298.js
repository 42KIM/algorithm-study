// [stack]
// BOJ 17298
// https://www.acmicpc.net/source/39329794

const [N, arr] = require("fs").readFileSync("/dev/stdin").toString().split("\n");
const inputArr = arr.split(" ").map(Number);

function solution(N, arr) {
    const answer = Array(N).fill(-1);
    const stack = [];
    for(let i=0; i<N; i++) {
        while(stack.length && arr[i] > arr[stack[stack.length - 1]]) {
            answer[stack.pop()] = arr[i];
        }
        stack.push(i);
    }
    console.log(answer.join(" "));
}
solution(+N, inputArr);