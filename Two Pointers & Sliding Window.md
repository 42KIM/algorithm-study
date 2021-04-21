# [ Two Pointer, 투 포인터 알고리즘 ]

#### 시간복잡도
O(N)  
두 개의 포인터가 각각 N번 움직이기 때문에 최대 움직인 횟수는 2N과 같다. O(N^2)의 시간복잡도를 갖는 완전탐색을 대체할 수 있는 효율적인 방법이다.

#### 설명
투 포인터 알고리즘은 리스트에 순차적으로 접근해야 할 때, 의미를 부여한 두 개의 포인터를 만들어서 처리하는 기법이다.  
배열에서 연속된 데이터 구간을 처리하는 경우 주로 사용한다. 시작점과 끝점을 하나씩 명시해서 순차적으로 존재하는 데이터의 특정 범위를 표현할 수 있기 때문이다.

#### 진행 순서
N개의 자연수를 갖는 수열에서, 연속 구간의 합이 M이 되는 경우의 수를 찾는 문제

+ 시작점(start)과 끝점(end)이 첫 번째 원소의 인덱스(0)을 가리키도록 한다.

+ 현재 부분 합(sum)이 M과 같다면, 카운트 한다.

+ 현재 부분 합이 M보다 작다면, end를 1 증가시킨다.

+ 현재 부분 합이 M보다 크거나 같다면, start를 1 증가시킨다.

+ 모든 경우를 확인할 때까지 과정을 반복한다.

#### 코드
```javascript
function twoPointers(M, arr) {
    let answer=0;
    let start=0;
    let sum=0;
    for(let end=0; end<arr.length; end++) {
        sum+=arr[end];
        if(sum===M) answer++;
        while(sum>=M){
            sum-=arr[start];
            start++;
            if(sum===M) answer++;
        }
    }
    return answer;
}

let M=6;
let arr=[1,5,3,2,1,6,9,2,1];
console.log(twoPointers(M,arr));
```
혹은 이런 식으로도. 다양하게 구현할 수 있다.
```javascript
function twoPointers(M, arr) {
    let answer=0;
    let end=0;
    let sum=0;
    for(let start=0; start<arr.length; start++) {
        while(sum<M && end<arr.length) {
            sum+=arr[end];
            end++;
        }
        if(sum===M) answer++;
        sum-=arr[start];
    }
    return answer;
}

let M=6;
let arr=[1,5,3,2,1,6,9,2,1];
console.log(twoPointers(M,arr));
```  
  

# [ Sliding Window, 슬라이딩 윈도우 ]

#### 시간복잡도
O(N)  
창문의 너비가 W인 경우, 최초의 창문에 대해서만 O(W), 이후로는 상수의 시간복잡도를 갖는다.

#### 설명
N개의 원소를 갖는 배열에 W의 너비를 갖는 창문이 존재한다고 가정하고, 창문을 한 칸씩 움직이며 그 안에 속한 원소들의 정보를 파악하는 기법이다.  


> 투 포인터와 마찬가지로 특정 구간을 훑으면서 지나간다는 점에서는 공통적이지만, 슬라이딩 윈도우는 언제나 그 구간의 너비가 동일하다는 점에서는 차이가 있다.

#### 진행 순서
+ 창문이 한 칸씩만 이동한다는 것은 창문이 한 번 움직일 때마다 (W-1)개의 원소는 겹친다는 것을 의미한다.  

+ 따라서 창문을 옆으로 움직일 때마다 W개의 원소를 매번 더하는 것이 아니라,  
창문 안에 추가된 새로운 원소를 더하고, 창문 안에 더이상 속하지 않는 원소만 제거하여 연산 횟수를 줄일 수 있다.

#### 코드
N일 동안 가게를 운영했을 때, 연속된 K일 중 가장 높았던 매출액을 구하는 문제

```javascript
function slidingWindow(k, arr) {
    let answer;
    let sum=0;
    // 첫 k일 동안의 매출액
    for(let i=0; i<k; i++) {
        sum+=arr[i];
    }
    answer=sum;
    // 슬라이딩 윈도우 시작
    for(let i=k; i<arr.length; i++) {
        sum+=(arr[i]-arr[i-k]);
        answer=Math.max(answer, sum);
    }
    return answer;
}

let k=3;
let arr=[12,15,11,20,25,10,20,19,13,15];
console.log(slidingWindow(k, arr));
```

#### 참고
[코딩 테스트 & 알고리즘 대회 핵심 노트 - 투 포인터(Two Pointers), 구간 합(Prefix Sum)](https://www.youtube.com/watch?v=rI8NRQsAS_s&t=382s)  
[[알고리즘 강의] Sliding Window, 슬라이딩 윈도우](https://www.youtube.com/watch?v=uH9VJRIpIDY)
