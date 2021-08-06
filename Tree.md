# [ Tree, 트리 ]

#### 설명

비선형 자료구조. 방향 그래프의 일종으로 정점을 가리키는 간선이 하나 밖에 없는 구조.

+ 루트 정점을 제외한 모든 정점은 반드시 하나의 부모 정점을 갖는다.
+ 정점이 N개인 트리는 반드시 N-1개의 간선을 가진다.
+ 루트에서 특정 정점으로 가는 경로는 **유일**하다.

[용어]

Root : 가장 상위 정점

Node : 각 정점

Leaf Node : 더 이상 자식이 없는 정점

Level : Root로부터 몇 번째 깊이인지를 표현하는 단위

Degree, 차수 : 한 정점에서 뻗어나가는 간선의 수

#### 이진 트리 : 각 정점이 최대 2개의 자식을 가지는 트리

![types](https://user-images.githubusercontent.com/75300807/128531037-b37d897a-b16e-4bdc-8d89-5c768a5e4318.PNG)

+ 정점이 N개인 이진 트리는 최악의 경우 높이가 N이 될 수 있다.
+ 정점이 N개인 포화 또는 완전 이진 트리의 높이는 log N이다.
+ 높이가 h인 포화 이진 트리는 2^h - 1 개의 정점을 가진다.
+ 일반적인 이진 트리를 사용하는 경우는 많지않다. 아래 자료구조에 응용된다.  
  이진 탐색 트리 / 힙 /AVL 트리 /레드 블랙 트리



#### 구현 방법

1. 인접행렬 or 인접리스트로 구현할 수 있다.
2. 이진트리의 경우 자식의 수가 2개 이하로 제한되기 때문에 배열 or 연결리스트로 구현 가능

+ 배열로 구현하기
  + 0번 인덱스는 편의를 위해 비워둔다.
  + Left = Index * 2
  + Right = Index * 2 + 1
  + Parent = floor(Index / 2)

![array](https://user-images.githubusercontent.com/75300807/128531921-8fe23a8a-27da-471c-9190-0341a9bf877a.PNG)

+ 연결 리스트로 구현하기  
  기존 연결리스트 Node에 next 대신 left와 right를 넣는다. 그리고 left와 right에 계속 값을 연결시켜주면 된다.

```javascript
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(node) {
        this.root = node;
    }
    
    display() {
        // Level Order
        const queue = new Queue();
        queue.enqueue(this.root);
        while (queue.size) {
            const currNode = queue.dequeue();
            console.log(currentNode.value);
            if (currNode.left) queue.enqueue(currNode.left);
            if (currNode.right) queue.enqueue(currNode.right);
        }
    }
}

const tree = new Tree(new Node(1));
tree.root.left = new Node(2);
tree.root.right = new Node(3);
tree.root.left.left = new Node(4);
tree.root.left.right = new Node(5);
tree.root.right.left = new Node(6);
```





