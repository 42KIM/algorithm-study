// [재귀]
// LeetCode 1823. Find the Winner of the Circular Game
// https://leetcode.com/problems/find-the-winner-of-the-circular-game/

var findTheWinner = function(n, k) {
  const players = Array.from({ length: n }, (_, i) => i + 1);
  
  const eliminatePlayer = function(remainPlayers) {
      if (remainPlayers.length === 1) return;
      else {
          let i = 0;
          while(i < k - 1) {
              remainPlayers.push(remainPlayers.shift());
              i++;
          }
          remainPlayers.shift();

          eliminatePlayer(remainPlayers);
      }
  }
  eliminatePlayer(players);
  
  return players.pop();
};