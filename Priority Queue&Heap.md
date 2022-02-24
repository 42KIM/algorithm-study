# [ Priority Queue / Heap, 우선순위 큐/힙 ]

#### 설명

우선순위 큐는 우선순위가 가장 높은 데이터를 가장 먼저 삭제하는 '개념'이다. 이를 구현하기 위해서 **배열**이나 **힙** 같은 자료구조를 사용하는 것이다.



#### 시간복잡도

+ 배열
  + 삽입 O(1)
  + 삭제 O(N)
+ 힙
  + 삽입 O(logN)
  + 삭제 O(logN)
  + 단순히 N개의 데이터를 힙에 넣었다가 꺼내는 작업은 정렬과 동일하게 O(NlogN)이다.



#### Heap 특징

+ 힙은 완전 이진트리 자료구조이다.
  + 완전 이진트리는 루트 노드부터 시작해서 왼쪽 자식 -> 오른쪽 자식 노드 순서대로 데이터가 삽입된다.
  + 트리 구조이기 때문에 최악의 경우에도 logN의 시간복잡도를 보장한다. 아무리 비교를 많이 해도 트리의 최대 높이 만큼만 올라가면 되기 때문.
+ 루트 노드가 항상 우선순위가 가장 높은 원소이다 -> 찾는 시간복잡도 O(1)
  + 루트 값이 곧 최대값 또는 최소값이다.
  + 힙에서는 최대, 최소값은 바로 확인 가능하지만 n번째로 크거나 작은 값은 찾으려면 모든 노드를 확인해야 한다.
+ 우선순위가 가장 높은 원소를 제거한다 -> 시간복잡도 O(logN)
  + 트리 구조를 깨지 않고 원소를 제거하지 않기 위해 마지막 노드와 루트 노드의 자리를 바꾼 뒤에 삭제한다.
  + 그 이후에 다시 힙의 조건을 맞추기 위해 루트 노드부터 아래로 자리를 바꿔내려간다.
+ 그냥 배열 구조로 처리한다면 삽입/값의 확인/삭제 연산의 시간복잡도는 O(1)/O(N)/O(N) 이지만, 힙을 사용하면 O(logN)/O(1)/O(logN)이기 때문에 더 빠르게 처리할 수 있따.



#### 구현하기

배열을 사용해서 트리 구조를 표현한다. 루트 노드를 인덱스 1부터 시작하기 위해 배열의 0번째 인덱스에 null을 추가하고 시작한다.

x번지의 왼쪽 자식은 2x, 오른쪽 자식은 2x+1, 부모는 Math.floor(x/2) 이다.

**최대 힙 구현 예시**

```javascript
class MaxHeap {
    constructor() {
        this.heap = [null];
    }
    
    // 삽입 메서드
    push(value) {
        this.heap.push(value);
        let curIdx = this.heap.length - 1;
        let parentIdx = Math.floor(curIdx / 2);
        
        while (parentIdx !== 0 && this.heap[parentIdx] < value) {
            [this.heap[parentIdx], this.heap[curIdx]] = [this.heap[curIdx], this.heap[parentIdx]];
            curIdx = parentIdx;
            parentIdx = Math.floor(curIdx / 2);
        }
    }
    
    // 삭제 메서드
    pop() {
        const root = this.heap[1];
        this.heap[1] = this.heap.pop();
        
        let curIdx = 1;
        let leftIdx = 2;
        let rightIdx = 3;
        
        while (
        	this.heap[curIdx] < this.heap[leftIdx] ||
            this.heap[curIdx] < this.heap[rightIdx]
        ) {
            if (this.heap[leftIdx] < this.heap[rightIdx]) {
                [this.heap[rightIdx], this.heap[curIdx]] = [this.heap[curIdx], this.heap[rightIdx]];
                curIdx = rightIdx;
            } else {
                [this.heap[leftIdx], this.heap[curIdx]] = [this.heap[curIdx], this.heap[leftIdx]];
                curIdx = leftIdx;
            }
            
            leftIdx = curIdx * 2;
            rightIdx = curIdx * 2 + 1;
        }
        
        return root;
    }
}
```

+ 추가
  + 루트 노드는 배열의 1번 인덱스부터 시작한다.
  + 힙 배열에 새로운 값을 추가한다.
  + 해당 값의 인덱스를 curIdx에 할당한다.
  + 해당 값의 부모 노드 인덱스를 parentIdx에 할당한다.
  + 부모 노드가 루트 노드를 넘어서거나(index = 0) 부모 노드의 값이 현재 노드보다 더이상 작지 않을 때까지, 부모 노드와 현재 노드를 비교하여 큰 수를 부모 노드 위치로 교체한다.
+ 삭제 
  + 루트 노드의 값을 기억한다.
  + 루트 노드의 값을 맨 마지막 노드와 교체하고, 배열에서 pop 시킨다.
  + 트리를 다시 힙 구조에 맞게 정렬하기 위한 작업이 필요하다.
  + 트리 아래로 노드를 탐색하기 위해 초기 인덱스를 설정한다.
  + 현재 노드의 값이 왼쪽 자식 보다 작거나, 오른쪽 자식보다 작을 때까지 교체 작업을 수행한다.  
    (리프가 없어서 더이상 연산을 하지 않는 것도 포함)
  + 리프 노드가 아닌 경우,
  + 만약 오른쪽 자식이 왼쪽 자식보다 크다면, 현재 노드를 오른쪽 노드와 교체한다.
  + 그렇지 않다면 현재 노드를 왼쪽 노드와 교체한다.
  + 교체한 뒤에 curIdx를 해당 노드의 인덱스로 교체한다.
  + 새로운 왼쪽 자식 인덱스와 오른쪽 자식 인덱스를 구한다.