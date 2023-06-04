import { SquareConfig } from "../types";

export type SquareWithPosition = {
  square: SquareConfig;
  rowIndex: number;
  columnIndex: number;
};

export function stepThroughSurroundingSquares(
  grid: SquareConfig[][],
  rowIndex: number,
  columnIndex: number,
  cb: ({ square, rowIndex, columnIndex }: SquareWithPosition) => void
) {
  const isFirstColumn = columnIndex === 0;
  const isLastColumn = columnIndex === grid[rowIndex].length - 1;
  const isFirstRow = rowIndex === 0;
  const isLastRow = rowIndex === grid.length - 1;

  let squaresToProcess: {
    square: SquareConfig;
    rowIndex: number;
    columnIndex: number;
  }[] = [];
  // above row
  if (!isFirstRow) {
    squaresToProcess.push({
      square: grid[rowIndex - 1][columnIndex],
      rowIndex: rowIndex - 1,
      columnIndex,
    });
    if (!isFirstColumn) {
      squaresToProcess.push({
        square: grid[rowIndex - 1][columnIndex - 1],
        rowIndex: rowIndex - 1,
        columnIndex: columnIndex - 1,
      });
    }
    if (!isLastColumn) {
      squaresToProcess.push({
        square: grid[rowIndex - 1][columnIndex + 1],
        rowIndex: rowIndex - 1,
        columnIndex: columnIndex + 1,
      });
    }
  }

  // current row
  if (!isFirstColumn) {
    squaresToProcess.push({
      square: grid[rowIndex][columnIndex - 1],
      rowIndex,
      columnIndex: columnIndex - 1,
    });
  }
  if (!isLastColumn) {
    squaresToProcess.push({
      square: grid[rowIndex][columnIndex + 1],
      rowIndex,
      columnIndex: columnIndex + 1,
    });
  }

  // next row
  if (!isLastRow) {
    squaresToProcess.push({
      square: grid[rowIndex + 1][columnIndex],
      rowIndex: rowIndex + 1,
      columnIndex,
    });

    if (!isFirstColumn) {
      squaresToProcess.push({
        square: grid[rowIndex + 1][columnIndex - 1],
        rowIndex: rowIndex + 1,
        columnIndex: columnIndex - 1,
      });
    }

    if (!isLastColumn) {
      squaresToProcess.push({
        square: grid[rowIndex + 1][columnIndex + 1],
        rowIndex: rowIndex + 1,
        columnIndex: columnIndex + 1,
      });
    }
  }

  squaresToProcess.forEach(cb);
}
