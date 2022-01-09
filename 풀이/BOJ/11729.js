// [재귀]
// BOJ 11729
// https://www.acmicpc.net/problem/11729

const input = require("fs").readFileSync("/dev/stdin").toString();
const N = parseInt(input, 10);

let count = 0;
let process = '';

function hanoi(n, start, end) {
    const temp = [1, 2, 3].find(point => point !== start && point !== end);
    if (n === 1) {
        count++;
        process += `${start} ${end}\n`;
        return;
    } else {
        hanoi(n-1, start, temp);
        count++;
        process += `${start} ${end}\n`;
        hanoi(n-1, temp, end);
    }
}
hanoi(N, 1, 3);

console.log(`${count}\n${process}`);