// [그리디]
// BOJ 1092
// https://www.acmicpc.net/problem/1092

// [틀린 접근]
// 이 방법으로는
// 특정 박스의 순서가 뒤로 밀렸을 때,
// 다음 순회에서 큰 크레인에 의해 옮겨질 수도 있지만
// 무게가 작은 박스가 먼저 옮겨져버리는 경우 전체 시간이 달라져버릴 수 있다.
function solution(totalCrane, crane, M, box) {
  crane.sort((a, b) => b - a);
  box.sort((a, b) => b - a);

  if (box[0] > crane[0]) {
    console.log(-1);
    return;
  };

  let cnt = 0;
  let boxIndex = 0;
  while(box.length) {
    const curOrder = boxIndex % totalCrane;
    if(curOrder === 0) cnt++;
    const curBox = box.shift();
    if(crane[curOrder] < curBox) box.push(curBox);
    boxIndex++;
  }

  console.log(cnt);
}