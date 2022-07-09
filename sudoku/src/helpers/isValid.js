export const isValid = (board) => {
    // check vertical
    for (let i = 0; i < 9; i++) {
      const columnNumbers = new Set();
      for (let j = 0; j < 9; j++) {
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
      const rowNumbers = new Set();
      for (let i = 0; i < 9; i++) {
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