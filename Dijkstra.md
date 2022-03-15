# 다익스트라

#### 시간복잡도

선형 탐색: O(N^2)  
  => 방문해야 할 N개의 노드에 대해서, 매번 '그 다음 최단 거리 노드'를 찾는 과정에서 N번 순회를 하기 때문. 선형 탐색 방법은 특히 정점의 개수는 많은데 간선은 적을 때 매우 비효율적일 수 있다.  

우선순위 큐: O(N * logN)  
  => '그 다음 최단 거리 노드'를 찾는 과정에서 최소 힙을 이용하면 logN.



#### 설명

특정한 노드에서 다른 모든 노드로 가는 최단 경로를 계산하는 방법이디. 각 노드를 연결하는 간선의 값이 음이 아닐 때 정상적으로 동작한다. (현실에서는 음의 간선이 없다!)  
매 상황에서 가장 비용이 적은 노드를 선택하기 때문에, 그리디 알고리즘으로 분류



#### 진행 흐름

1. 출발 노드 설정
2. 최단 거리 테이블 초기화
   + 출발 노드 = 0, 나머지 = INF
3. 방문하지 않은 노드 중에서 비용이 가장 적은 노드를 선택
4. 해당 노드를 거쳐 다른 노드로 가는 비용을 계산하여 더 짧은 거리로 테이블 갱신
5. 모든 노드를 순회할 때까지 3, 4번을 반복



#### 코드
![다익스트라](https://user-images.githubusercontent.com/75300807/158183935-9efe0ceb-6708-4974-97ad-4b7bec5ef8b6.PNG)

+ 선형 탐색 : 단방향 또는 양방향으로 연결된 6개의 노드가 있을 때, 최단 거리를 구하는 방법

```javascript
function solution(N, input) {
  const graph = Array.from({ length: N + 1 }, () =>
    Array(N + 1).fill(Number.MAX_SAFE_INTEGER)
  );
  for (const [s, e, d] of input) {
    graph[s][e] = d;
  }
  for (let i = 1; i <= N; i++) {
    graph[i][i] = 0;
  }

  const visited = Array.from({ length: N + 1 }, () => false);
  const dist = Array.from({ length: N + 1 }, () => Number.MAX_SAFE_INTEGER);
  dist[1] = 0;

  function findNextMinNode() {
    let min = Number.MAX_SAFE_INTEGER;
    let minNode = 0;
    for (let i = 1; i <= N; i++) {
      if (!visited[i] && dist[i] < min) {
        minNode = i;
        min = dist[i];
      }
    }
    return minNode;
  }

  // 특정한 정점에서부터 다른 연결된 모든 정점으로 갈 수 있는 최소 비용을 구하는 함수
  function dijkstra(start) {
    visited[start] = true;
    for (let i = 1; i <= N; i++) {
      dist[i] = graph[start][i];
    }

    for (let j = 0; j < N - 1; j++) {
      let current = findNextMinNode();
      console.log('cur: ', current);
      visited[current] = true;
      for (let k = 1; k <= N; k++) {
        if (graph[current][k]) {
          if (dist[current] + graph[current][k] < dist[k]) {
            dist[k] = dist[current] + graph[current][k];
          }
        }
      }
    }
  }
  dijkstra(1);

  return dist.slice(1);
}

console.log(solution(6, input));	// [0, 2, 3, 1, 2, 4 ]
```

1. 노드 간 연결된 간선 정보를 기록하는 테이블을 초기화 한다. 방문 여부를 체크하는 ```visited``` 배열과 최단 거리 값을 저장하는 ```dist``` 배열도 초기화 한다.
2. 현재 상황에서, 방문한 적이 없는 노드 중에서 최단 거리인 노드를 찾는 ```findNextMinNode```를 정의한다. 이때 dist 배열을 순회해야 하기 때문에 시간복잡도는 N.
3. 첫 번째 노드의 최단 거리를 0으로 할당하고, 첫 번째 노드에 연결되어 있는 노드들의 간선 값을 dist 배열에 할당한다.
4. 첫 번째 노드를 제외한 남은 노드의 개수만큼 순회하며, findNextMinNode 함수를 통해 다음 방문할 노드를 찾는다. 현재 노드에 연결된 다음 노드들을 순회하며 현재 최단 거리 값에, 다음 노드의 간선 값을 더한 값이 다음 노드의 기존 최단 거리 값보다 작으면 dist 배열을 갱신한다.
5. 모든 노드를 순회할 때까지 반복한다.



+ 우선순위 큐 / 최소 힙

```javascript
// 최소 힙 정의
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

// 
function s2(N, input) {
  const graph = Array.from({ length: N + 1 }, () =>
    Array(N + 1).fill(Number.MAX_SAFE_INTEGER)
  );
  for (const [s, e, d] of input) {
    graph[s][e] = d;
  }
  for (let i = 1; i <= N; i++) {
    graph[i][i] = 0;
  }

  const dist = Array.from({ length: N + 1 }, () => Number.MAX_SAFE_INTEGER);

  function dijkstra(start) {
    const minHeap = new MinHeap();
    minHeap.push([1, 0]);
    dist[start] = 0;

    while (minHeap.heap.length > 1) {
      const [curIdx, curDist] = minHeap.pop();

      // 이미 방문했던 노드라는 뜻 (더 작은 값으로 바뀌어 있다는 것이니)
      if (dist[curIdx] < curDist) continue;

      for (let i = 1; i <= N; i++) {
        if (graph[curIdx][i]) {
          if (curDist + graph[curIdx][i] < dist[i]) {
            minHeap.push([i, dist[i]]);
          }
        }
      }
    }
  }
  dijkstra(1);

  return dist.slice(1);
}

console.log(s2(6, input));	// [0, 2, 3, 1, 2, 4 ]
```

+ 선형 탐색 방법과 전체적인 흐름은 비슷하다. 다만, 최소 힙에 요소가 들어갔다가 나옴과 동시에 가장 작은 값으로 정렬이 되기 때문에 ```visited``` 배열을 사용하여 방문한 노드를 따로 체크하거나 ```findNextMinNode```를 사용하여 다음 최단 거리 노드를 별도로 찾지 않아도 된다.



#### 참고



[다익스트라 알고리즘(Dijkstra Algorithm) [ 실전 알고리즘 강좌(Algorithm Programming Tutorial) #25 ]](https://www.youtube.com/watch?v=611B-9zk2o4)

