# [ Selection Sort, 선택 정렬 ]

#### 시간복잡도

O(N^2)  
선택 정렬은 가장 작은 수를 찾아서 맨 앞으로 보내는 연산을 N-1 번 반복한다. 선택 정렬의 전체 연산 횟수를 수식으로 나타내면,  
 N + (N-1) + (N-2) + ... + 2 이다. (마지막 한 번은 연산할 필요가 없다)  
 이를 식으로 나타내면 (N-1)*(N+2)/2 = N^2+N+2 이며, Big-O 표기법에 따라 시간복잡도는 N^2이 된다.  

 #### 설명

 **선택 정렬**은 처리되지 않은 데이터 중에서 가장 작은 데이터를 선택해, 맨 앞에 있는 데이터와 위치를 바꾸는 것을 반복하는 방법이다.

 > 정렬은 알고리즘의 효율성을 가장 잘 보여주는 예시이지만, 선택 정렬은 다른 정렬 알고리즘에 비해 비효율적이다. 시간복잡도가 높아 데이터가 조금만 많아지더라도 수행시간이 급증하기 때문이다.

 #### 진행 순서

 + 선택 정렬의 탐색범위는 반복할 때마다 줄어들고, 매번 탐색범위만큼 데이터를 확인해야하니 선형탐색을 반복적으로 수행하는 것과 같다. 다라서 이중 for 문을 사용하여 구현한다.

 + '정렬할 범위의 시작 요소'를 지정하는 외부반복문은 배열의 첫 번째 요소( i=0 )부터 마지막 바로 전 요소( i < arr.length-1 )까지 순회한다.  
   (마지막 요소는 전 단계까지의 수행으로 이미 정렬된 상태이기 때문이다)

 + min_idx 변수에는 탐색범위 내에서 가장 작은 요소의 위치가 담긴다. 매번 처음에는 가장 작은 요소와 위치가 바뀔, 정렬되지 않은 데이터의 맨 앞 요소( i )가 담긴다.

+ '탐색할 범위'를 의미하는 내부반복문은 외부반복문의 현재 인덱스 바로 다음 요소( j = i+1 )부터 배열의 마지막 요소( j < arr.length )까지 순회하며 가장 작은 값을 찾는다.

+ 찾은 가장 작은 값( arr[j] )의 인덱스( j )를 min_idx에 담는다.

+ 정렬범위의 맨 앞 요소( arr[i] )와 탐색범위의 가장 작은 요소( arr[min_idx] )의 값을 swap한다.

#### 코드

배열의 요소를 오름차순으로 정렬하는 문제

```javascript
function selectionSort(arr) {
    let answer = arr;
    for(let i=0; i<arr.length-1; i++) {
        let min_idx = i;
        for(let j=i+1; j<arr.length; j++) {
            if(arr[j]<arr[min_idx]) min_idx = j;
        }
        [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];
    }
    return answer;
}

let arr = [2,1,3,5,4];
console.log(selectionSort(arr));
```

자바스크립트에서의 swap 방법들  

+ temp 변수 사용

  ```javascript
  temp = a;
  a = b;
  b = temp;
  ```

+ 배열 사용

  ```javscript
  b = [a, a=b][0];
  ```

+ 디스트럭처링 할당(ES6)

  ```javascript
  [a, b] = [b, a];
  ```

+ 연산 활용 (새로운 변수 선언 X)

  ```javascript
  a = a+b;
  b = a-b;
  a = a-b;
  ```

+ 비트연산 XOR 

  ```javascript
  ?
  ```

#### 참고
[(이코테 2021 강의 몰아보기) 4. 정렬 알고리즘](https://www.youtube.com/watch?v=KGyK-pNvWos)  
[[실전 알고리즘] 0x0E강 - 정렬 I](https://blog.encrypted.gg/955)