const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

console.log(
    input[1].split(" ")
            .map(n => +n)
            .sort((a, b) => a - b)
            .reduce((acc, cur, i, { length }) => acc + (cur * (length - i)), 0)
);