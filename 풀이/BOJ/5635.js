// [정렬]
// BOJ 5635
// https://www.acmicpc.net/problem/5635

const [N, ...arr] = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
const inputArr = arr.map(p => p.split(" "));

function solution(arr, N) {
  const people = arr.slice();

  for(let i=0; i<N-1; i++) {
    let min = i;
    for(let j=i+1; j<N; j++) {
      if (+people[j][3] > +people[min][3]) min = j;
      else if (+people[j][3] === +people[min][3] && +people[j][2] > +people[min][2]) min = j;
      else if (+people[j][2] === +people[min][2] && +people[j][1] > +people[min][1]) min = j;
    }
    if (min !== i) [people[i], people[min]] = [people[min], people[i]];
  }
  
  console.log(people[0][0]);
  console.log(people[N-1][0])
}

solution(inputArr, +N)