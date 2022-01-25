// [정렬]
// BOJ 1599
// https://www.acmicpc.net/problem/1599

const [_, ...arr] = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

const minsikIndex = {}
const msAlphabet = 'a b k d e g h i l m n ? o p r s t u w y'.split(" ");
msAlphabet.forEach((s, i) => {
  minsikIndex[s] = i;
});

function replaceNg(str) {
  return str.replace(/ng/g, '?');
}

function compareWord(a, b) {
  const [wordA, wordB] = [a, b].map(word => replaceNg(word))
  let i = 0;

  while(i < wordA.length && i < wordB.length) {
    if (wordA[i] === wordB[i]) {
      i++;
      continue;
    };

    return minsikIndex[wordA[i]] - minsikIndex[wordB[i]];
  }

  return wordA.length - wordB.length;
}

function solution(words) {
  words.sort((a, b) => compareWord(a, b));
  words.forEach(word => console.log(word));
}

solution(arr);