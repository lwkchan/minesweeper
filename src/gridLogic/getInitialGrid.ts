import {
  Difficulty,
  GameSettings,
  gameSettingsConfig,
} from "../gameDifficultyConfig";
import { stepThroughSurroundingSquares } from "./stepThroughSurroundingSquares";
import { BailOutSquare, SquareConfig } from "../types";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

const defaultGameSettings = gameSettingsConfig[
  Difficulty.MEDIUM
] as GameSettings;

export function getInitialGrid(
  gameSettings?: GameSettings
): [SquareConfig[][], BailOutSquare] {
  const { width, height, mines } = gameSettings || defaultGameSettings;
  // Make initial grid
  const across = Array.from({ length: width }, (_, i) => {
    return {
      id: `${i}`.padStart(2, "0"),
      isOpen: false,
      isMine: false,
      numberOfSurroundingMines: 0,
    };
  });

  const grid = Array.from({ length: height }, (_, i) =>
    across.map((config) => {
      return { ...config, id: config.id + `${i}`.padStart(2, "0") };
    })
  );

  // Set the mines
  const numberOfMines = mines;
  let numberOfSetMines = 0;

  const bailOutSquare: [number, number] = [
    getRandomInt(grid[0].length),
    getRandomInt(grid.length),
  ];

  while (numberOfSetMines < numberOfMines) {
    const rowIndex = getRandomInt(grid[0].length);
    if (rowIndex === bailOutSquare[0]) {
      continue;
    }

    const columnIndex = getRandomInt(grid.length);
    if (columnIndex === bailOutSquare[1]) {
      continue;
    }

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

  return [grid, bailOutSquare];
}
