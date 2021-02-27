import { SquareConfig } from './types';

export function checkIfWinningGrid(grid: SquareConfig[][]): boolean {
  const squares = grid.flat();
  // if all flagged ones are mines
  const flaggedSquares = squares.filter((s) => s.isFlagged);
  const isAllFlaggedSquaresMines = flaggedSquares.every((s) => s.isMine);

  // bail early if not all flagged are mines
  if (!isAllFlaggedSquaresMines) {
    return false;
  }
  // and all non flagged ones are open
  const nonFlaggedSquares = squares.filter((s) => !s.isFlagged);
  const isAllNonFlaggedSquaresOpen = nonFlaggedSquares.every((s) => s.isOpen);

  if (isAllNonFlaggedSquaresOpen) {
    return true;
  }

  return false;
}
