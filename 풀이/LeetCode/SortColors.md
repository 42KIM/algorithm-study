### 문제

+ LeetCode > 75. Sort Colors
+ 정렬
+ [링크](https://leetcode.com/problems/sort-colors/)



### 풀이

선택 정렬을 이용하여 풀었지만, 보다 상황에 맞는 정렬 방식이 필요할 것 같아서 다양한 풀이법을 찾아봤다.



**[1] 내 풀이 (선택 정렬)**

```javascript
var sortColors = function(nums) {
    for(let i=0; i<nums.length-1; i++) {
        let minIdx = i;
        for(let j=i+1; j<nums.length; j++) {
            if(nums[j] < nums[minIdx]) minIdx = j;
        }
        [nums[i], nums[minIdx]] = [nums[minIdx], nums[i]];
    }
};
```

'0'을 배열의 왼쪽으로 보내고, '2'를 배열의 오른쪽으로 보내야하니 배열을 오름차순으로 정렬해도 정답이 된다.

그러나 선택정렬이 문제 의도에 완벽하게 부합하는 것 같지는 않다.



**[2] '0은 왼쪽으로, 2는 오른쪽으로' 보내는 풀이 (One-Pass)** 

```javascript
var sortColors = function(nums) {
    let i = 0;
    let left = 0;
    let right = nums.length - 1;
    
    while(i <= right) {
        if(nums[i] === 0) {
            [nums[left], nums[i]] = [nums[i], nums[left]];
            left++;
            i++;
        }
        else if(nums[i] === 2) {
            [nums[i], nums[right]] = [nums[right], nums[i]];
            right--;
        }
        else i++;
    }
};
```

투포인터와 비슷하다.

배열의 첫번째 요소를 left, 마지막 요소를 right로 초기화한 뒤,

배열을 순회하면서 요소가 0이면 가장 앞에 위치한 left와 교체하고, 2이면 가장 뒤에 위치한 right와 교체한 뒤 각 위치를 배열 안쪽으로 한 칸씩 땡겨준다.



**[3] '0은 왼쪽으로, 2는 오른쪽으로' 보내는 풀이 (Two-Pass)**

```javascript
var sortColors = function(nums) {
    let front = 0;
    for(let i=0; i<nums.length; i++) {
        if(nums[i] === 0) {
            [nums[front], nums[i]] = [nums[i], nums[front]];
            front++;
        }
    }
    
    let mid = front;
    for(let i=0; i<nums.length; i++) {
        if(nums[i] === 1) {
            [nums[mid], nums[i]] = [nums[i], nums[mid]];
            mid++;
        }
    }
};
```

위 풀이와 거의 비슷하지만,

배열을 '두 번' 순회하며 첫 번째는 배열의 앞쪽으로 0을 몰아넣고, 두 번째는 0이 끝나는 지점부터 1을 정렬한다.



**[4] 직접 개수를 카운트해서 정답 배열을 새롭게 만드는 풀이 (완전 탐색)**

```javascript
var sortColors = function(nums) {
    let zero = 0, one = 0, two = 0;
    
    for(let el of nums) {
        if(el === 0) zero++;
        else if(el === 1) one++;
        else two++;
    }
    
    nums.length = 0;
    
    for(let i=0; i<zero; i++) answer.push(0);
    for(let i=0; i<one; i++) answer.push(1);
    for(let i=0; i<two; i++) answer.push(2);
};
```

정렬 알고리즘은 아니지만, 완전 탐색으로도 풀 수 있다.

배열의 length를 활용해서 요소를 삭제하는 것이 핵심이다.



특정 알고리즘에 집착하지 말고, 다양한 풀이 방법을 떠올려보자.