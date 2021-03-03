import { GameSettings } from './gameDifficultyConfig';
import { stepThroughSurroundingSquares } from './stepThroughSurroundingSquares';
import { SquareConfig } from './types';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

const defaultGameSettings = { width: 20, height: 20, mines: 9 };

export function getInitialGrid(
  gameSettings: GameSettings = defaultGameSettings
): SquareConfig[][] {
  const { width, height, mines } = gameSettings;
  // Make initial grid
  const across = Array.from({ length: width }, (_, i) => {
    return {
      id: `${i}`,
      isOpen: false,
      isMine: false,
      numberOfSurroundingMines: 0,
    };
  });

  const grid = Array.from({ length: height }, (_, i) =>
    across.map((config) => {
      return { ...config, id: config.id + `${i}` };
    })
  );

  // Set the mines
  const numberOfMines = mines;
  let numberOfSetMines = 0;
  while (numberOfSetMines < numberOfMines) {
    const columnIndex = getRandomInt(grid[0].length);
    const rowIndex = getRandomInt(grid.length);

    if (grid[rowIndex][columnIndex].isMine) {
      continue;
    }

    grid[rowIndex][columnIndex].isMine = true;

    // set up numbers
    stepThroughSurroundingSquares(grid, rowIndex, columnIndex, ({ square }) => {
      square.numberOfSurroundingMines += 1;
    });

    numberOfSetMines += 1;
  }

  return grid;
}
