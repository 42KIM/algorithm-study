// [재귀]
// BOJ 2630
// https://www.acmicpc.net/problem/2630

const [N, ...arr] = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
const inputN = +N;
const map = arr.map(row => row.split(" ").map(n => +n));

function solution(n, map) {
    let white = 0;
    let blue = 0;
    
    function isValidateMap(x, y, len) {
        for(let i=0; i<len; i++) {
            for(let j=0; j<len; j++) {
                if (map[x][y] !== map[x+i][y+j]) return false;  
            }
        }
        return true;
    }
    
    function checkPaper(startX, startY, rowLen) {
        if (isValidateMap(startX, startY, rowLen)) {
            map[startX][startY] === 0 ? white++ : blue++;
            return;
        }
        
        const dx = [0, rowLen/2, 0, rowLen/2];
        const dy = [0, 0, rowLen/2, rowLen/2];
        
        for(let i=0; i<4; i++) {
            const newX = startX + dx[i];
            const newY = startY + dy[i];
            if (isValidateMap(newX, newY, rowLen/2)) {
                map[newX][newY] === 0 ? white++ : blue++;
            } else {
                checkPaper(newX, newY, rowLen/2);
            }
        }
    }
    checkPaper(0, 0, n);
    
    console.log(`${white}\n${blue}`);
}

solution(inputN, map);