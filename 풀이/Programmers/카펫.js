function solution(brown, yellow) {
  let total = brown + yellow;
  
  for(let yHeight=1; yHeight <= yellow; yHeight++) {
      if (yellow % yHeight) continue;
      
      let yWidth = yellow / yHeight;
      if ((yHeight + 2) * (yWidth + 2) === total) return [yWidth + 2, yHeight + 2];
  }
}