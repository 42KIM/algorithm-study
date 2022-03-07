// [이분 탐색]
// 프로그래머스 입국심사
//

function solution(n, times) {
  times.sort((a, b) => a - b);
  let end = times[times.length - 1] * n;
  let start = times[0];
  let minTime = Number.MAX_SAFE_INTEGER;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    let passed = 0;

    for (const time of times) {
      passed += Math.floor(mid / time);
      if (passed >= n) break;
    }

    if (passed < n) {
      start = mid + 1;
    } else {
      minTime = Math.min(mid, minTime);
      end = mid - 1;
    }
  }

  return minTime;
}
