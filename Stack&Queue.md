# [ Stack, 스택 ]

+ 한 쪽 끝에서만 원소를 넣거나 뺄 수 있는 선형 자료구조.  

+ 가장 마지막에 들어온 데이터가 가장 먼저 처리되는 Last In First Out, LIFO 방식을 사용한다.  
  ( = First In Last Out, FILO )
  
+ 스택에서는 제일 상단이 아닌 나머지 원소들의 확인, 변경이 *원칙적으로는* 불가능하다.

+ push(), pop() 함수를 통해 구현할 수 있다.
  
  
  
  **e.g. 올바른 쌍의 괄호를 찾는 방법**
  
  여는 괄호 "("와 닫는 괄호 ")"의 쌍이 맞는지 확인할 때, stack 구조를 사용할 수 있다.
  
  ```javascript
  function isPair(str) {
      let stack = [];
      for(let x of str) {
          if(x === "(") stack.push("(");
          else {
              if(stack.length === 0) return "false";
              stack.pop();
          }
      }
      if(stack.length) return "false";
      return "true";
  }
  
  console.log(isPair("(())()"));	// true
  ```
  
  위의 방법처럼 함수를 만들지 않고도, 올바른 괄호 여부를 확인할 수 있다.
  
  ```javascript
  let str = "(())()";
  let open = 0;
  let close = 0;
  let answer = false;
  
  for(let x of str) {
      if(x === "(") open++;
      else close++;
      if(close > open) {
          answer = "false";
          break;
      }
  }
  if(open === close) answer = "true";
  
  console.log(answer);	// true
  ```
  



#### (+ 추가) 연결 리스트로 스택 구현하기

```javascript
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Stack {
    constructor() {
        this.top = null;
        this.size = 0;
    }
    
    push(value) {
        const node = new Node(value);
        node.next = this.top;
        this.top = node;
        this.size++;
    }
    
    pop() {
        const value = this.top.value;
        this.top = this.top.next;
        this.size--;
        return value;
    }
    
    size() {
        return this.size;
    }
}
```





# [ Queue, 큐 ]

+ 한 쪽 끝에서 원소를 넣고 반대쪽 끝에서 원소를 뺄 수 있는 자료구조.

+ 먼저 들어간 데이터가 먼저 처리되는 First In First Out, FIFO 방식을 사용한다.
+ 제일 앞/뒤가 아닌 나머지 원소들의 확인, 변경이 *원칙적으로는* 불가능하다.
+ push(), shift() 함수를 통해 구현할 수 있다.



#### 구현

+ 배열로 구현하기

```javascript
class Queue {
    constructor() {
        this.queue = [];
        this.front = 0;
        this.rear = 0;
    }
    
    enqueue(value) {
        this.queue[this.rear++] = value;
    }
    
    dequeue() {
        const value = this.queue[this.front];
        delete this.queue[this.front];
        this.front++;
        return value;
    }
    
    peek() {
        return this.queue[this.front];
    }
    
    size() {
        return this.rear - this.front;
    }
}
```



+ 연결 리스트로 구현하기

```javascript
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    
    enqueue(newValue) {
        const newNode = new Node(newValue);
        if(this.head === null) {
            this.head = this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++;
    }
    
    dequeue() {
        const value = this.head.value;
        this.head = this.head.next;
        this.size--;
        return value;
    }
    
    peek() {
        return this.head.value;
    }
}
```

