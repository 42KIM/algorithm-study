// [queue]
// BOJ 5464
// https://www.acmicpc.net/problem/5464

const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const cost = input.slice(1, 1 + N).map(Number);
const weight = input.slice(1 + N, 1 + N + M).map(Number);
const schedule = input.slice(1 + N + M).map(Number);

function solution(N, cost, weight, schedule) {
  const parkingLots = Array.from({ length: N }).fill(0);
  let totalCost = 0;
  const queue = [];
  
  for(let i=0; i<schedule.length; i++) {
    if (schedule[i] > 0) {
      const emptySpot = parkingLots.indexOf(0);
      if (emptySpot !== -1) {
        parkingLots[emptySpot] = schedule[i];
        continue;
      }
      queue.push(schedule[i]);
    } else {
      for(let k=0; k<parkingLots.length; k++) {
        if (parkingLots[k] === Math.abs(schedule[i])) {
          totalCost += (cost[k] * weight[Math.abs(schedule[i]) - 1]);
          parkingLots[k] = queue.length ? queue.shift() : 0;
        }
      }
    }
  }
  console.log(totalCost);
}

solution(N, cost, weight, schedule);