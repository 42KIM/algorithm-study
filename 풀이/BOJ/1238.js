// [다익스트라]
// BOJ 1238
// https://www.acmicpc.net/problem/1238

const [input, ...arr] = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

const [N, _, destination] = input.split(' ').map(Number);
const infos = arr.map((info) => info.split(' ').map(Number));

function solution(N, partyPlace, arr) {
  const graph = Array.from({ length: N + 1 }, () =>
    Array.from({ length: N + 1 }).fill(0)
  );
  for (const [s, e, d] of arr) {
    graph[s][e] = d;
  }

  function dijkstra(start) {
    const dist = Array.from({ length: N + 1 }, () => Number.MAX_SAFE_INTEGER);
    dist[start] = 0;

    const minHeap = new MinHeap();
    minHeap.push([start, 0]);

    while (minHeap.heap.length > 1) {
      const [curIdx, curDist] = minHeap.pop();
      if (dist[curIdx] < curDist) continue;

      for (let i = 1; i <= N; i++) {
        if (graph[curIdx][i] && curDist + graph[curIdx][i] < dist[i]) {
          dist[i] = curDist + graph[curIdx][i];
          minHeap.push([i, dist[i]]);
        }
      }
    }
    return dist;
  }

  const toPartyDist = Array.from({ length: N + 1 }, () => 0);
  const toHomeDist = dijkstra(partyPlace);
  for (let i = 1; i <= N; i++) {
    if (i === partyPlace) continue;
    toPartyDist[i] = dijkstra(i)[partyPlace];
  }

  const answer = Array.from({ length: N + 1 }, () => 0);
  for (let i = 1; i <= N; i++) {
    answer[i] = toPartyDist[i] + toHomeDist[i];
  }

  return Math.max(...answer);
}

console.log(solution(N, destination, infos));

// 최소 힙
class MinHeap {
  constructor() {
    this.heap = [null];
  }

  push(value) {
    this.heap.push(value);
    let curIdx = this.heap.length - 1;
    let parentIdx = Math.floor(curIdx / 2);

    while (parentIdx !== 0 && this.heap[parentIdx][1] > value[1]) {
      [this.heap[parentIdx], this.heap[curIdx]] = [
        this.heap[curIdx],
        this.heap[parentIdx],
      ];
      curIdx = parentIdx;
      parentIdx = Math.floor(curIdx / 2);
    }
  }

  pop() {
    if (this.heap.length === 1) {
      return;
    }
    if (this.heap.length === 2) {
      return this.heap.pop();
    }

    const root = this.heap[1];
    this.heap[1] = this.heap.pop();

    let curIdx = 1;
    let leftIdx = 2;
    let rightIdx = 3;

    while (
      (this.heap[leftIdx] && this.heap[curIdx][1] > this.heap[leftIdx][1]) ||
      (this.heap[rightIdx] && this.heap[curIdx][1] > this.heap[rightIdx][1])
    ) {
      if (
        this.heap[leftIdx] &&
        this.heap[rightIdx] &&
        this.heap[leftIdx][1] > this.heap[rightIdx][1]
      ) {
        [this.heap[rightIdx], this.heap[curIdx]] = [
          this.heap[curIdx],
          this.heap[rightIdx],
        ];
        curIdx = rightIdx;
      } else if (this.heap[leftIdx]) {
        [this.heap[leftIdx], this.heap[curIdx]] = [
          this.heap[curIdx],
          this.heap[leftIdx],
        ];
        curIdx = leftIdx;
      }

      leftIdx = curIdx * 2;
      rightIdx = curIdx * 2 + 1;
    }

    return root;
  }
}
