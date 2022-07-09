<script>
  import { isValid } from "./helpers/isValid.js";

  const board = [
    [0, 9, 0, 0, 0, 5, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 0],
    [0, 0, 0, 4, 0, 0, 0, 0, 0],
    [0, 0, 3, 0, 5, 0, 7, 0, 0],
    [0, 0, 0, 0, 0, 6, 0, 0, 0],
    [0, 8, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 0, 0, 0, 1, 0],
  ];
  const visistedCells = new Set()
  let m = 0;
  let n = 0;
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function solve(board) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) {
          for (let k = 1; k < 10; k++) {
            m = i;
            n = j;
            visistedCells.add(`${i},${j}`);
            board[i][j] = k;
            await sleep(1);
            if (isValid(board)) {
              if (await solve(board)) {
                return true;
              }
            }
          }
          visistedCells.delete(`${i},${j}`);
          board[i][j] = 0;
          return false;
        }
      }
    }
    await sleep(100);
    return !confirm("more?");
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
            <td class="{i === m && j === n ? "current" : visistedCells.has(`${i},${j}`) ? "visited" : cell === 0 ? "empty": "preset"}">
                {cell}
            </td>
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
    border: 3px solid black;
  }

  td {
    aspect-ratio: 1/1;
    min-width: min(10vw, 10vh);
    border: 1px solid black;
    text-align: center;
  }

  tr:nth-child(3n + 3) {
    border-bottom: 3px solid black;
  }

  td:nth-child(3n + 3) {
    border-right: 3px solid black;
  }

  .visited {
    background-color: #ffa500; /* #6CC4A1; */
    color: #ffffff;
  }

  .current {
    background-color: #fa4831; /* #ffa500; */
    color: #ffffff;
  }

  .empty {
    color: #ffffff;
  }

  .preset {
    background-color: #6CC4A1;
    color: #ffffff;
  }
</style>
