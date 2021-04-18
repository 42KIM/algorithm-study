# [ Binary Search, 이분 탐색/이진 탐색 ]

#### 시간복잡도

O(logN)

#### 설명

*순차탐색*은 특정한 데이터를 찾기 위해 앞에서부터 하나씩 확인하는, O(N)의 시간복잡도를 가진 방법이다.<br/>
반면, **이분탐색**은 **정렬되어 있는 데이터**의 탐색 범위를 절반식 줄여가며 확인하는 방법이다.

> 이분탐색의 전제조건은 **정렬된** 자료구조

#### 진행 순서

+ 데이터 정렬

+ 시작점(left)과 끝점(right), 그리고 이 둘을 이용해 만들어낸 중간점(mid)를 변수로 설정한다.

  (시작점과 끝점은 index를 의미)

+ 중간점이 두 개 존재하는 경우(짝수), mid의 소수점 이하는 제거하여 표현한다.

+ 찾는 값(target)과 mid 값이 일치하는지 비교한다.

  + target이 mid보다 크면, left = mid + 1
  + target이 mid보다 작으면, right = mid - 1
  + right가 left보다 작아질 때까지 반복하여 탐색범위를 절반식 줄여나간다. 



#### 코드

특정 숫자가 배열의 몇 번째에 위치 하는지 구하는 문제

+ while 문

``` javascript
function binarySearch(target, arr) {
    let answer;
    arr.sort((a,b)=>a-b);
    let lt=0, rt=arr.length-1;
    while(lt<=rt) {
        let mid=Math.floor((lt+rt)/2);
        if(arr[mid]===target) {
            answer=mid+1;
            break;
        }
        else if(arr[mid]>target) rt=mid-1;
        else lt=mid+1;
        }
    }
    return answer;
}

let arr=[23, 87, 65, 12, 57, 32, 99, 81];
console.log(binarySearch(32, arr));
```

+ 재귀적 구현

```javascript
function binarySearch(lt, rt, target) {
    let mid=Math.floor((lt+rt)/2);
    if(arr[mid]===target) return mid+1;
    else if(arr[mid]>target) {
        rt=mid-1;
        return binarySearch(lt, rt, target);
    } else {
        lt=mid+1;
        return binarySearch(lt, rt, target);
    }
}

function solution(target, arr) {
    let answer;
    let lt=0, rt=arr.length-1;
    arr.sort((a,b)=>a-b);
    answer=binarySearch(lt, rt, target);
    return answer;
}

let arr=[23, 87, 65, 12, 57, 32, 99, 81];
console.log(solution(32, arr));
```

#### 참고
[(이코테 2021 강의 몰아보기) 5. 이진 탐색](https://www.youtube.com/watch?v=94RC-DsGMLo&t=328s) 
