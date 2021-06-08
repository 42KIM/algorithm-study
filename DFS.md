# [ DFS, 깊이 우선 탐색 ]

#### 시간복잡도

V : 노드의 수  
E : 간선의 수  

인접 행렬 : O(V^2)  
노드 하나당 반복문을 돌며 연결된 노드를 확인해야 하고, 모든 노드를 방문할 때마다 실행

인접 리스트 : O(V+E)  
노드에 연결된 간선만 확인. 즉, 모든 노드의 개수와 모든 간선의 개수

#### 설명

> Depth First Search. 데이터를 탐색할 때 깊이를 우선으로 하여 탐색하는 알고리즘.

루트 노드에서 시작해서 다음 분기로 넘어가기 전에 해당 분기의 끝까지 완벽하게 탐색한 뒤에 돌아와서 다음 분기로 넘어간다.

모든 경로를 방문해야 할 경우 사용하기에 적합하다.

Stack이나 재귀 함수를 사용한다. 

#### 순회 방법

+ 전위순회  
  1 -> 2 -> 4 -> 5 -> 3 -> 6 -> 7  
  부모 노드 -> 왼쪽 자식 -> 오른쪽 자식 순
+ 중위순회  
  4 -> 2 -> 5 -> 1 -> 6 -> 3 -> 7  
  왼쪽 자식 -> 부모 노드 -> 오른쪽 자식 순
+ 후위순회  
  4 -> 5 -> 2 -> 6 -> 7 -> 3 -> 1  
  왼쪽 자식 -> 오른쪽 자식 -> 부모 노드 순

#### 코드

재귀 함수를 사용하여 이진 트리를 깊이 우선 탐색 (전위순회)

```javascript
function solution(v) {
    let answer = [];
    function DFS(v) {
        if(v > 7) return;
        else {
            answer.push(v);
            DFS(v * 2);
            DFS(v * 2 + 1);
        }
    }
    DFS(v);
    return answer;
}

console.log(solution(1)); // [1, 2, 4, 5, 3, 6, 7]

// 중위순회 시
DFS(v * 2);
answer.push(v);
DFS(v * 2 + 1);

// 후위순회 시
DFS(v * 2);
DFS(v * 2 + 1);
answer.push(v);
```


