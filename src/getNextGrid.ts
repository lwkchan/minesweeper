import produce from 'immer';
import {
  SquareWithPosition,
  stepThroughSurroundingSquares,
} from './stepThroughSurroundingSquares';
import { SquareConfig } from './types';

function processSurroundingSquares(
  nextGrid: SquareConfig[][],
  pressedSquareRowIndex: number,
  pressedSquareColumnIndex: number
) {
  const cb = ({ square, rowIndex, columnIndex }: SquareWithPosition) => {
    if (square.isOpen || square.isFlagged) {
      return;
    }
    square.isOpen = true;
    if (square.numberOfSurroundingMines === 0) {
      // then step through again
      processSurroundingSquares(nextGrid, rowIndex, columnIndex);
    }
  };

  stepThroughSurroundingSquares(
    nextGrid,
    pressedSquareRowIndex,
    pressedSquareColumnIndex,
    cb
  );
}

export function getNextGrid(
  currentGrid: SquareConfig[][],
  pressedSquare: SquareConfig,
  pressedSquareRowIndex: number,
  pressedSquareColumnIndex: number
): SquareConfig[][] {
  const nextGrid = produce(currentGrid, (nextGrid) => {
    nextGrid[pressedSquareRowIndex][pressedSquareColumnIndex].isOpen = true;

    // if it's a number, only open the number
    if (pressedSquare.numberOfSurroundingMines > 0) {
      return;
    }
    // if it's a blank space, the surrounding squares will need to be processed
    processSurroundingSquares(
      nextGrid,
      pressedSquareRowIndex,
      pressedSquareColumnIndex
    );
  });

  return nextGrid;
}

export function getLosingGrid(
  currentGrid: SquareConfig[][],
  _pressedSquare: SquareConfig,
  pressedSquareRowIndex: number,
  pressedSquareColumnIndex: number
): SquareConfig[][] {
  const losingGrid = produce(currentGrid, (nextGrid) => {
    // you reveal all the bombs and keep the rest of them closed
    nextGrid.forEach((row, rowIndex) =>
      row.forEach((square, columnIndex) => {
        if (
          rowIndex === pressedSquareRowIndex &&
          columnIndex === pressedSquareColumnIndex
        ) {
          square.isBlownUpMine = true;
        }
        if (square.isMine) {
          square.isOpen = true;
        }
        if (square.isFlagged && !square.isMine) {
          // replace flag with incorrectMine and open it up
          square.isFlagged = false;
          square.isIncorrectMine = true;
          square.isOpen = true;
        }
      })
    );
  });

  return losingGrid;
}

export function toggleFlag(
  grid: SquareConfig[][],
  square: SquareConfig,
  rowIndex: number,
  columnIndex: number
): SquareConfig[][] {
  return produce(grid, (draftGrid) => {
    (draftGrid as SquareConfig[][])[rowIndex][
      columnIndex
    ].isFlagged = !square.isFlagged;
  });
}
