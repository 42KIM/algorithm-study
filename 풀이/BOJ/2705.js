// [우선순위 큐]
// BOJ 2705
//

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

class MinHeap {
  constructor() {
    this.heap = [null];
  }

  push(value) {
    this.heap.push(value);
    let curIdx = this.heap.length - 1;
    let parentIdx = Math.floor(curIdx / 2);

    while (parentIdx !== 0 && this.heap[parentIdx] > value) {
      [this.heap[parentIdx], this.heap[curIdx]] = [
        this.heap[curIdx],
        this.heap[parentIdx],
      ];
      curIdx = parentIdx;
      parentIdx = Math.floor(curIdx / 2);
    }
  }

  pop() {
    const root = this.heap[1];
    this.heap[1] = this.heap.pop();

    let curIdx = 1;
    let leftIdx = 2;
    let rightIdx = 3;

    while (
      this.heap[curIdx] > this.heap[leftIdx] ||
      this.heap[curIdx] > this.heap[rightIdx]
    ) {
      if (this.heap[leftIdx] > this.heap[rightIdx]) {
        [this.heap[rightIdx], this.heap[curIdx]] = [
          this.heap[curIdx],
          this.heap[rightIdx],
        ];
        curIdx = rightIdx;
      } else {
        [this.heap[leftIdx], this.heap[curIdx]] = [
          this.heap[curIdx],
          this.heap[leftIdx],
        ];
        curIdx = leftIdx;
      }

      leftIdx = curIdx * 2;
      rightIdx = curIdx * 2 + 1;
    }

    return root;
  }
}

let init = true;
let N;
const mh = new MinHeap();
rl.on('line', function (line) {
  if (init) {
    N = Number(line);
    init = false;
    return;
  }

  line
    .split(' ')
    .map(Number)
    .forEach((number) => {
      if (mh.heap.length === 1 || mh.heap[1] < number) {
        mh.push(number);
      }
      while (mh.heap.length > N + 1) mh.pop();
    });
}).on('close', function () {
  console.log(mh.pop());
  process.exit();
});
