const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];

rl.on('line', function(line){
    input.push(line);
}).on('close', function(){
    // 풀이
    const prices = input.slice(1).map(n => +n);
    console.log(prices.sort((a, b) => b - a).reduce((acc, cur, i) => i % 3 !== 2 ? acc + cur : acc, 0));
    // 풀이 끝
    process.exit();
})