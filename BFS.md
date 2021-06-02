# [ BFS, 너비 우선 탐색 ]

#### 시간복잡도

V : 노드의 수

E : 간선의 수

인접 행렬 : O(V^2)
노드 하나당 반복문을 돌며 연결된 노드를 확인해야 하고, 모든 노드를 방문할 때마다 실행

인접 리스트 : O(V+E)
노드에 연결된 간선만 확인. 즉, 모든 노드의 개수와 모든 간선의 개수

#### 설명

> Breadth First Search. 데이터를 탐색할 때 너비를 우선으로 하여 탐색하는 알고리즘. 

DFS가 노드에서 뻗을 수 있는 한 분기의 끝까지 탐색한 뒤 돌아와 다른 분기를 탐색하는 것과 달리, BFS는 같은 level에 있는 노드들을 전부 탐색하고 다음 level을 탐색한다. 따라서 시작 노드에서 가까운 노드들부터 탐색이 이루어 진다.

최단 경로를 찾는 게 우선일 때 주로 사용하는 방식.

Queue를 활용한다.

#### 진행 순서

+ 시작 노드를 큐에 삽입하고, 방문 처리한다.
+ 큐에서 노드를 꺼낸다.
+ 꺼낸 노드에 연결된 노드 중 방문하지 않은 노드를 방문 처리하고, 차례대로 큐에 삽입한다.
+ 큐가 빌 때가지 반복한다.

#### 코드

아래의 이진 트리를 넓이 우선 탐색

![사진](/src/bfs.PNG)

```javascript
function solution() {
    let answer = [];
    let queue = [];
    queue.push(1);
    while(queue.length) {
        let v = queue.shift();
        answer.push(v);
        for(let nv of [v*2, v*2+1]) {
            if(nv > 7) continue;
            queue.push(nv);
        }
    }
    return answer;
}

console.log(solution()); // [1, 2, 3, 4, 5, 6, 7]
```

