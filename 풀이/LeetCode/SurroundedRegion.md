### 문제

+ LeetCode > 130. Surrounded Regions
+ **DFS**
+ [링크](https://leetcode.com/problems/surrounded-regions/)



### 풀이

**내 풀이**

```javascript
var solve = function(board) {
    let m = board.length;
    let n = board[0].length;
    let visited = Array.from({length:m}, ()=>Array(n).fill(0));
    let dx = [-1, 0, 1, 0];
    let dy = [0, 1, 0, -1];
    
    function DFS(x, y) {
        for(let i=0; i<4; i++) {
            let nx = x + dx[i];
            let ny = y + dy[i];
            if(nx >= 0 && ny >= 0 && nx < m && ny < n && board[nx][ny] === 'O' && visited[nx][ny] === 0) {
                visited[nx][ny] = 1;
                DFS(nx, ny);
            }
        }        
    }
    
    for(let i=0; i<m; i++) {
        for(let j=0; j<n; j++) {
            if(board[i][j] === 'O' && visited[i][j] === 0) {
                visited = Array.from({length:m}, ()=>Array(n).fill(0));
                visited[i][j] = 1;
                DFS(i, j);
                let flag  = 0;
                for(let k=0; k<m; k++) {
                    for(let l=0; l<n; l++) {
                        if(visited[k][l] === 1) {
                            if(k === 0 || l === 0 || k === m-1 || l === n-1) {
                                flag = 1;
                                break;
                            }
                        }
                    }
                }
                if(!flag) {
                    for(let vx=0; vx<m; vx++) {
                        for(let vy=0; vy<n; vy++){
                            if(visited[vx][vy]) board[vx][vy] = 'X';
                        }
                    }
                }
            }
        }
    }
};
```

나의 로직은 다음과 같았다.

- 보드를 순회하면서 'O'을 만나면 DFS 함수를 호출한다.

+ DFS 함수는 방문한 좌표를 체크한 뒤, 현재 위치의 상하좌우를 순서대로 탐색한다.

+ 탐색 중 현재 좌표에서 연결되어 있는 또 다른 'O'를 발견하면 해당 좌표로 이동하여 반복한다.

+ 연결되어 있는 모든 'O'의 탐색이 완료되면, 체크 배열(visited)을 순회하며 방문한 좌표들 중에서 보드의 모서리에 위치한 좌표가 없는지 확인한다.

+ 만약 모서리에 위치한 좌표가 하나도 없다면 보드에서 해당 좌표를 'X'로 교체한다.

+ 다시 처음으로 돌아와 보드를 순회하며 위의 과정을 반복한다.



통과는 했으나, 말도 안 되게 가독성이 나쁘고 효율도 좋지 않은 풀이였다.

런타임 104ms로 상위 40%, 메모리 사용은 48.4MB로 무려 하위 16%였다...



**좋은 답안 예시**

```javascript
function solve(board) {
  if (!board.length) return;

  // change every square connected to left and right borders from O to temporary #
  for (let i = 0; i < board.length; i++) {
    mark(board, i, 0);
    mark(board, i, board[0].length - 1);
  }

  // change every square connected to top and bottom borders from O to temporary #
  for (let i = 1; i < board[0].length - 1; i++) {
    mark(board, 0, i);
    mark(board, board.length - 1, i);
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      // change the rest of O to X
      if (board[i][j] === 'O') board[i][j] = 'X';

      // change temporary # back to O
      if (board[i][j] === '#') board[i][j] = 'O';
    }
  }
}

function mark(board, i ,j) {
  if (i < 0 || i > board.length - 1 || j < 0 || j > board[0].length - 1) return;
  if (board[i][j] !== 'O') return;

  board[i][j] = '#';
  
  mark(board, i - 1, j);
  mark(board, i + 1, j);
  mark(board, i, j - 1);
  mark(board, i, j + 1);
}
```

+ 모서리에 위치한 'O'를 찾아 연결된 모든 'O'를 임의의 문자 '#'로 교체한다.
+ 보드를 순회하며 'O'는 'X'로 교체하고, '#'은 'O'로 교체한다.

DFS를 수행하는 함수를 만들어 연결된 'O'를 찾는 방법만 비슷했다...  



이밖에도,

+ 체크 배열을 생성하여 모서리의 'O'를 찾아 연결된 모든 'O'를 방문 체크하고
+ 보드를 순회하며 방문하지 않은 'O'가 있다면 바로 'X'로 교체해버린다.

같은 방식의 풀이도 있었다.



DFS를 사용하여 연결된 좌표를 탐색하는 아이디어는 틀리지 않았지만 무식하게 모든 좌표를 방문하고 체크하고 다시 모서리인지 판단하는 것이 아니라,

모서리 부분의 좌표를 먼저 찾아서 따로 기록해두고, 기록할 필요 없이 바로 'X'로 교체해주면 되는 내부의 좌표들을 찾은 뒤에 다시 모서리를 원래대로 돌린다는 아이디어를 떠올리는 것이 중요한 문제였다.