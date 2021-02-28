import { SquareConfig } from './types';

export function checkIfWinningGrid(grid: SquareConfig[][]): boolean {
  const squares = grid.flat();

  // if all flagged ones are mines
  // and all non flagged ones are open
  const isWinning = squares.every((s) => {
    if (s.isFlagged && s.isMine) {
      return true;
    }

    if (!s.isFlagged && s.isOpen && !s.isMine) {
      return true;
    }

    return false;
  });

  return isWinning;
}
