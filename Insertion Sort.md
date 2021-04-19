# [ Insertion Sort, 삽입 정렬 ]
#### 시간복잡도
O(N^2)
반복문이 두 번 중첩되어 사용되기 때문에 최악의 경우 선택 정렬, 거품 정렬과 마찬가지의 시간복잡도를 갖는다.  
다만, 데이터가 '거의 정렬된 상태' 같은 특정한 경우에는 연산이 적게 수행되기 때문에 어떤 알고리즘보다도 빠르다는 특징을 갖는다.  
최선의 경우 즉, 모두 정렬되어 있는 경우는 O(N)의 시간복잡도를 갖는다.

#### 설명
삽입 정렬은 처리되지 않은 데이터를 하나씩 골라, 이미 정렬된 데이터 사이에서 **적절한 위치**를 찾아 삽입하는 방법이다.
> 선택 정렬, 거품 정렬이 무조건 위치를 바꾸는 방식이었다면 삽입 정렬은 *필요할 때만* 위치를 바꾼다. 따라서 둘에 비해 구현 난이도는 조금 높지만, 더 효율적으로 작동한다.

#### 진행 순서
+ 삽입 정렬은 탐색 대상( 외부 for 문의 인덱스 i )의 앞에 있는 원소들이 이미 정렬되어있다고 가정한다.  
첫 번째 원소( i=0 ) 앞에는 원소가 없기 때문에, 첫 번재 원소는 정렬된 원소로 가정하고 두 번째 원소( i=1 )부터 탐색을 시작한다.

+ 탐색 대상을 temp 변수에 할당한다.

+ **정렬된 범위**에서 들어갈 수 있는 **적절한 위치**를 뒤에서부터( j=i-1부터 j=0까지 ) 탐색하여 알맞는 위치에 temp를 삽입한다.  
*e.g.* 오름차순으로 정렬하는 경우, 정렬된 범위의 가장 끝점부터 비교하며 탐색 대상이 왼쪽 원소보다 작다면 위치를 바꾸고, 그렇지 않다면 제자리에 머무른다.

+ 적절한 위치에 삽입을 완료했다면, 다음 탐색 대상( i++ )를 temp에 할당하여 위의 과정을 반복한다.

#### 코드
+ 이중 for 문 사용
```javascript
function insertionSort(arr) {
    let answer=arr;
    for(let i=1; i<arr.length; i++) {
        let temp=arr[i];
        let j;
        for(j=i-1; j>=0; j--) {
            if(arr[j]>temp) arr[j+1]=arr[j];
            else break;
        }
        arr[j+1]=temp;
    }
    return answer;
}

let arr=[2,3,1,5,4];
console.log(insertionSort(arr));
```
+ for 문 + while 문 사용
```javascript
function insertionSort(arr) {
    let answer=arr;
    for(let i=1; i<arr.length; i++) {
        let temp=arr[i];
        let j=i-1;
        while(j>=0 && arr[j]>temp) {
            arr[j+1]=arr[j];
            j--
        }
        arr[j+1]=temp;
    }
    return answer;
}

let arr=[2,3,1,5,4];
console.log(insertionSort(arr));
```

#### 참고
[(이코테 2021 강의 몰아보기) 4. 정렬 알고리즘](https://www.youtube.com/watch?v=KGyK-pNvWos)  
[자바스크립트 알고리즘 문제풀이](https://www.inflearn.com/course/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EB%AC%B8%EC%A0%9C%ED%92%80%EC%9D%B4
)