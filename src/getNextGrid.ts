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
    if (square.isOpen) {
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
