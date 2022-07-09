export const isValidMove = (board, x, y, num) => {
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