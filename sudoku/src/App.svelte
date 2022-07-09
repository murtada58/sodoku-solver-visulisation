<script>
  const board = [
    [5, 3, 4, 0, 7, 8, 9, 0, 2],
    [6, 0, 2, 0, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 0, 2, 0, 0, 7],

    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 0, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],

    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 0, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 0, 9],
  ];
  let m = 0;
  let n = 0;
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const isValidMove = (board, x, y, num) => {
    // check vertical
    for (let i = 0; i < 9; i++) {
      if (board[i][x] === num) {
        return false;
      }
    }

    // check horizontal
    for (let i = 0; i < 9; i++) {
      if (board[y][i] === num) {
        return false;
      }
    }

    // check square
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (
          board[i + 3 * Math.floor(y / 3)][j + 3 * Math.floor(x / 3)] === num
        ) {
          return false;
        }
      }
    }

    return true;
  };

  const isValid = (board) => {
    // check vertical
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const columnNumbers = new Set();
        if (board[i][j] !== 0) {
          if (columnNumbers.has(board[i][j])) {
            return false;
          }
          columnNumbers.add(board[i][j]);
        }
      }
    }

    // check horizontal
    for (let j = 0; j < 9; j++) {
      for (let i = 0; i < 9; i++) {
        const rowNumbers = new Set();
        if (board[i][j] !== 0) {
          if (rowNumbers.has(board[i][j])) {
            return false;
          }
          rowNumbers.add(board[i][j]);
        }
      }
    }

    // check square
    for (let m = 0; m < 9; m += 3) {
      for (let n = 0; n < 9; n += 3) {
        const squareNumbers = new Set();
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (board[m + i][n + j] !== 0) {
              if (squareNumbers.has(board[m + i][n + j])) {
                return false;
              }
              squareNumbers.add(board[m + i][n + j]);
            }
          }
        }
      }
    }

    return true;
  };

  async function solve(board) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) {
          for (let k = 1; k < 10; k++) {
            m = i;
            n = j;
            board[i][j] = k;
            await sleep(100);
            if (isValid(board)) {
              if (await solve(board)) {
                //return true;
              }
            }
          }
          board[i][j] = 0;
          return false;
        }
      }
    }
    prompt("more?");
    return true;
  }

  solve(board);

  setInterval(() => {
    board = board;
  }, 1);
</script>

<table>
  <tbody>
    {#each board as row, i}
      <tr>
        {#each row as cell, j}
          <td class={i === m && j === n ? "current" : ""}>{cell}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    aspect-ratio: 1/1;
    width: min(90vw, 90vh);
    border-collapse: collapse;
    margin: auto;
    border: 2px solid black;
  }

  td {
    aspect-ratio: 1/1;
    width: min(30vw, 30vh);
    border: 1px solid black;
    text-align: center;
  }

  tr:nth-child(3n + 3) {
    border-bottom: 2px solid black;
  }

  td:nth-child(3n + 3) {
    border-right: 2px solid black;
  }

  .current {
    background-color: #ffa500;
    color: #ffffff;
  }
</style>
