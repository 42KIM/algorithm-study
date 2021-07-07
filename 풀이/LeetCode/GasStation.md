### 문제

+ LeetCode > 134. Gas Station
+ **Greedy**
+ [링크](https://leetcode.com/problems/gas-station/)



### 풀이

내가 가장 취약한 그리디 알고리즘을 사용하여 해결하는 문제였다. 

O(N^2)의 브루트 포스 풀이를 사용했기 때문에 속도와 메모리 사용에서 최하위 수준을 기록했다.

```javascript
var canCompleteCircuit = function(gas, cost) {
    let answer = -1;
    let n = gas.length;
    for(let i=0; i<n; i++) {
        if(gas[i] >= cost[i]) {
            let start = i;
            let sum = 0;
            let flag = 1;
            for(let j=start; j<start+n; j++) {
                sum += gas[j%n] - cost[j%n];
                if(sum < 0) {
                    flag = 0;
                    break;
                }
            }
            if(flag) {
                answer = i;
                break;
            }
        }
    }
    return answer;
};
```

나의 접근은 이러했다.

gas가 cost보다 같거나 큰 지점만 시작점으로 잡을 수 있다.

해당 시작점부터 시계 오른쪽 방향으로 순회하면서,

gas[i] - cost[i]를 sum에 더해간다.

sum이 0보다 작아지는 순간, 보유한 기름보다 더 많은 거리를 간다는 의미이므로 불가능한 시작점임을 표시한다.

모든 시작점을 돌면서 순회 가능한 시작점이 있다면 해당 시작점 인덱스를 반환한다.

그렇지 않은 경우 -1을 반환한다.  



**적합한 풀이**

```javascript
var canCompleteCircuit = function(gas, cost) {
    let curTank = 0, totalTank = 0, pos = 0;
    for (let i=0;i<gas.length;i++) {
        curTank+= gas[i] - cost[i];
        totalTank+= gas[i] - cost[i];
        if (curTank<0) {
            curTank = 0;
            pos = i+1;
        }
    }   
    return totalTank<0?-1:pos;
}
```

시간복잡도가 O(N)으로 훨씬 줄어든 One-Pass 풀이다.

gas[i] - cost[i]가 0 이상인 시작점(pos)을 찾음과 동시에 전체 기름량을 더해간다.

모든 요소를 순회했을 때 전체 기름량이 0이상 이라면 순환 가능한 배열임을 알 수 있기 때문이다.  



어떻게 보면 의미적으로는(?) 나의 접근이 크게 틀리지는 않았다. 그러나 나는 그것을 곧이 곧대로 일일이 구현하려고 했다. 

특히 시작점이 정해졌을 때, 순환하며 동일한 값들을 더하는 과정이 **반복**된다는 점에서 힌트를 얻는 것이 중요했던 것 같다. 같은 연산을 여러 번 반복하기 때문에 그 부분을 어떻게 최소화할지 생각했다면 전체 합을 구하는 방법을 떠올릴 수 있었을 것 같다.  



그리디의 핵심은 내가 떠올린 아이디어를 의미적으로 포괄하는 간결한 로직을 떠올리는 것이다. 다양한 유형의 문제를 많이 풀어보며 최적화된 로직을 세우는 연습이 필요하다..