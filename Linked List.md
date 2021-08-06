# [ 연결 리스트, Linked List ]

#### 시간복잡도

탐색 시 : O(N)

요소 추가 or 제거 시 : O(1)

#### 설명

연결 리스트는 각 요소를 포인터로 연결하여 관리하는 선형 자료구조다.

각 요소는 Node 라고 부르며 데이터 영역과 포인터 영역으로 구성된다. 배열은 순차적인 데이터가 들어가기 때문에 메모리 영역을 연속적으로 사용하지만, 연결리스트는 각 데이터가 퍼져있고 퍼져있는 메모리 영역을 알기 위해 포인터를 사용하여 참조한다.

따라서 배열에서는 요소를 삭제하면 빈 공간을 메우기 위해 뒷요소를 앞으로 당겨야 해서 선형 시간 O(N)이 필요하지만, 연결 리스트에서는 삭제할 요소의 이전/다음 요소에만 접근하면 되기 때문에 상수 시간만이 소요된다. 요소 추가도 마찬가지.

단방향으로 연결된 **단일 연결 리스트(Singly Linked List)**, 양방향으로 연결된 **이중 연결 리스트(Doubly Linked List)**, 순환이 가능한 **환형 연결 리스트(Circular Linked List)**가 있다.

#### 구현 순서

1. ```Node``` class와 ```SinglyLinkedList``` class로 구성된다.

2. Node의 생성자는 ```value```와 ```next```로 구성되어 있다. **값**과 **포인터**. 노드가 생성되는 시점에는 포인터는 아무 것도 가리키고 있지 않다.

3. SinglyLinkedList의 생성자는 ```head```와 ```tail``` 포인터로 이루어진다. SinglyLinkedList 클래스는 노드끼리 연결시켜주는 역할만 할 뿐, 자체적으로 노드를 갖지 않는다.

4. ```find``` 로직 

   : ```currNode``` 변수에 head 노드를 담고, 원하는 값을 찾을 때까지 순회하도록 한다. 원하는 값을 찾으면 해당 노드를 return 한다.

5. ```append``` (끝 부분에 노드 추가) 로직 

   : 추가하려는 노드를 생성하여 ```newNode``` 변수에 담는다. 만약 head가 null이라면 값이 들어있지 않은 연결 리스트니, head와 tail 포인터가 ```newNode```를 가리키도록 설정한다. 그렇지 않다면 기존 tail의 포인터(```next```)가 추가하려는 ```newNode```를 가리키도록 만들고, tail 포인터가 ```newNode```를 가리키도록 한다.

6. ```insert``` (특정 노드 뒤에 노드 삽입) 로직 

   : ```newNode``` 생성. newNode의 포인터를 '특정 노드'의 다음 노드를 가리키도록 한다. '특정 노드'의 포인터는 ```newNode```를 가리키도록 한다.

7. ```remove``` (값을 찾은 후, 삭제) 로직 

   (탐색 과정 때문에 선형 시간이 소요된다. 만약 상수 시간으로 삭제하려면 삭제하려는 요소의 이전 요소를 입력값으로 받기)

   4번의 ```find```로직을 통해 삭제하고자 하는 요소의 '이전 요소'를 찾아 ```prevNode```에 담는다. 찾았다면, '이전 요소'의 포인터가 다다음 요소를 가리키도록 수정한다. 그러면 삭제 대상인 노드는 아무런 노드와 연결되지 않아서 연결 리스트에서 배제된다. (추후 가비지 컬렉션에 의해 메모리 해제)

#### 코드

```javascript
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }
    
    find(value) {
        let currNode = this.head;
        while (currNode.value !== value) {
            currNode = currNode.next;
        }
        return currNode;
    }
    
    append(newValue) {
        const newNode = new Node(newValue);
        if(this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }
    
    insert(node, newValue) {
        const newNode = new Node(newValue);
        newNode.next = node.next;
        node.next = newNode;
    }
    
    remove(value) {
        let prevNode = this.head;
        while (prevNode.next.value !== value) {
            prevNode = prevNode.next;
        }
        if (prevNode.next !== null) {
            prevNode.next = prevNode.next.next;
        }
    }
}
```



리스트 크기 구하는 size 메서드 구현

예외처리 모두 구현.