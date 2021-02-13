import { SquareConfig } from './types';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function getInitialGrid(): SquareConfig[][] {
  // Make initial grid
  console.log('getting inital grid');
  const across = Array.from({ length: 40 }, (_, i) => {
    return {
      id: `${i}`,
      isOpen: false,
      isPressed: false,
      isMine: false,
      numberOfSurroundingMines: 0,
    };
  });

  const grid = Array.from({ length: 40 }, (_, i) =>
    across.map((config) => {
      return { ...config, id: config.id + `${i}` };
    })
  );

  // Set the mines
  const numberOfMines = 40;
  let numberOfSetMines = 0;
  while (numberOfSetMines < numberOfMines) {
    const columnIndex = getRandomInt(grid[0].length);
    const rowIndex = getRandomInt(grid.length);

    if (grid[rowIndex][columnIndex].isMine) {
      continue;
    }

    grid[rowIndex][columnIndex].isMine = true;

    const isFirstColumn = columnIndex === 0;
    const isLastColumn = columnIndex === grid[rowIndex].length - 1;
    const isFirstRow = rowIndex === 0;
    const isLastRow = rowIndex === grid.length - 1;

    // set surrounding squares with number of mines
    // above row
    if (!isFirstRow) {
      grid[rowIndex - 1][columnIndex].numberOfSurroundingMines += 1;
      if (!isFirstColumn) {
        grid[rowIndex - 1][columnIndex - 1].numberOfSurroundingMines += 1;
      }
      if (!isLastColumn) {
        grid[rowIndex - 1][columnIndex + 1].numberOfSurroundingMines += 1;
      }
    }

    // current row
    if (!isFirstColumn) {
      grid[rowIndex][columnIndex - 1].numberOfSurroundingMines += 1;
    }
    if (!isLastColumn) {
      grid[rowIndex][columnIndex + 1].numberOfSurroundingMines += 1;
    }

    // next row
    if (!isLastRow) {
      grid[rowIndex + 1][columnIndex].numberOfSurroundingMines += 1;

      if (!isFirstColumn) {
        grid[rowIndex + 1][columnIndex - 1].numberOfSurroundingMines += 1;
      }

      if (!isLastColumn) {
        grid[rowIndex + 1][columnIndex + 1].numberOfSurroundingMines += 1;
      }
    }

    numberOfSetMines += 1;
  }

  return grid;
}
