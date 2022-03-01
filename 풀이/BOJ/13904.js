// [우선순위 큐]
// BOJ 13904
// https://www.acmicpc.net/problem/13904

function solution(tasks) {
  tasks.sort((a, b) => b[0] - a[0] || b[1] - a[1]);
  let maxDay = tasks[0][0];
  let totalPoint = 0;

  while (maxDay) {
    let maxIdx = null;
    let maxPoint = 0;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i][0] < maxDay) break;
      if (tasks[i][1] > maxPoint) {
        maxIdx = i;
        maxPoint = tasks[i][1];
      }
    }

    if (maxIdx !== null) {
      totalPoint += tasks[maxIdx][1];
      tasks.splice(maxIdx, 1);
    }

    maxDay--;
  }

  return totalPoint;
}

console.log(solution(tasks));
