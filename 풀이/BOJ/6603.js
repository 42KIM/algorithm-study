function solution(testCase) {
  const answer = [];
  const check = Array.from({ length: testCase.length }).fill(false);

  function DFS(v) {
    if (v === testCase.length) {
      let numbers = [];
      check.forEach((checked, i) => checked && numbers.push(testCase[i]));
      if (numbers.length === 6) answer.push(numbers.join(" "));
      return;
    }

    check[v] = true;
    DFS(v+1);
    check[v] = false;
    DFS(v+1);
  }
  DFS(0);

  answer.forEach(lotto => console.log(lotto));
}

solution(testCases);