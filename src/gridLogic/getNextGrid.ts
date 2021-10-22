import produce from 'immer';
import {
  SquareWithPosition,
  stepThroughSurroundingSquares,
} from './stepThroughSurroundingSquares';
import { SquareConfig } from '../types';

function processSurroundingSquares(
  nextGrid: SquareConfig[][],
  pressedSquareRowIndex: number,
  pressedSquareColumnIndex: number,
  cb: ({ square, rowIndex, columnIndex }: SquareWithPosition) => void
) {
  stepThroughSurroundingSquares(
    nextGrid,
    pressedSquareRowIndex,
    pressedSquareColumnIndex,
    cb
  );
}

const getNextSquaresToOpen = (pressedSquareRowIndex: number, pressedSquareColumnIndex: number, currentGrid: SquareConfig[][],): [number, number][] => {
  let squares: [number, number][] = [[pressedSquareRowIndex, pressedSquareColumnIndex]]
  const cb = ({ square: currentSquare, rowIndex, columnIndex }: SquareWithPosition) => {
    if (squares.some(([r, c]) => rowIndex === r && c === columnIndex)) {
      return;
    }
    if (currentSquare.isOpen || currentSquare.isFlagged || currentSquare.isMine) {
      return;
    }
    squares.push([rowIndex, columnIndex])
    if (currentSquare.numberOfSurroundingMines === 0) {
      processSurroundingSquares(currentGrid, rowIndex, columnIndex, cb)
    }
  }

  processSurroundingSquares(currentGrid, pressedSquareRowIndex, pressedSquareColumnIndex, cb)

  return squares;
}

export function getNextGrid(
  currentGrid: SquareConfig[][],
  pressedSquare: SquareConfig,
  pressedSquareRowIndex: number,
  pressedSquareColumnIndex: number
): SquareConfig[][] {

  const squaresToOpen: [number, number][] = getNextSquaresToOpen(pressedSquareRowIndex, pressedSquareColumnIndex, currentGrid)

  const nextGrid = produce(currentGrid, (nextGrid) => {
    squaresToOpen.forEach(([row, column]) => {
      nextGrid[row][column].isOpen = true
    })
  })

  return nextGrid
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

export function getBailedOutGrid(
  grid: SquareConfig[][],
  pressedSquareRowIndex: number,
  pressedSquareColumnIndex: number,
  [bailOutSquareRow, bailOutSquareColumn]: [number, number]
): SquareConfig[][] {

  // Calculate the squares to edit outside produce for performance
  const squaresToSubtractOne: [number, number][] = []
  processSurroundingSquares(grid, pressedSquareRowIndex, pressedSquareColumnIndex, ({ columnIndex, rowIndex }) => {
    squaresToSubtractOne.push([rowIndex, columnIndex])
  })

  const squaresToAddOne: [number, number][] = []
  processSurroundingSquares(grid, bailOutSquareRow, bailOutSquareColumn, ({ columnIndex, rowIndex }) => {
    squaresToAddOne.push([rowIndex, columnIndex])
  })


  const nextGrid = produce(grid, (draftGrid) => {
    // Pressed square is no longer a mine
    draftGrid[pressedSquareRowIndex][pressedSquareColumnIndex].isMine = false;
    // Subtract 1 from surrounding squares
    squaresToSubtractOne.forEach(([row, column]) => {
      draftGrid[row][column].numberOfSurroundingMines -= 1
    })

    // now bailout square is a mine
    draftGrid[bailOutSquareRow][bailOutSquareColumn].isMine = true
    // add one to surrounding squares
    squaresToAddOne.forEach(([row, column]) => {
      draftGrid[row][column].numberOfSurroundingMines += 1
    })
  })


  return nextGrid
}