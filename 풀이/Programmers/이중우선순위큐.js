// [우선순위 큐]
// 코딩테스트 연습 > 힙(Heap) > 이중우선순위큐
// https://programmers.co.kr/learn/courses/30/lessons/42628

class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    if (!this.heap.length) {
      this.heap.push(value);
      return;
    }
    for (let i = 0; i < this.heap.length; i++) {
      if (value <= this.heap[i]) {
        this.heap.splice(i, 0, value);
        return;
      }
      if (i === this.heap.length - 1) {
        this.heap.push(value);
        return;
      }
    }
  }

  popMax() {
    this.heap.pop();
  }

  popMin() {
    this.heap.shift();
  }
}

function solution(operations) {
  const mh = new MinHeap();

  for (const op of operations) {
    const [char, num] = op.split(' ');
    if (char === 'I') mh.push(+num);
    else if (mh.heap.length === 0) continue;
    else if (+num === 1) mh.popMax();
    else mh.popMin();
  }

  return mh.heap.length ? [mh.heap.pop(), mh.heap.shift()] : [0, 0];
}
