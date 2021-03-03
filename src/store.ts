import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { checkIfWinningGrid } from './checkIfWinningGrid';
import { GameSettings } from './gameDifficultyConfig';
import { getInitialGrid } from './getInitialGrid';
import { SquareConfig } from './types';

function getNumberOfMines(grid: SquareConfig[][]): number {
  return grid.flat().filter((square) => square.isMine).length;
}

export enum GameState {
  BEFORE_START = 'BEFORE_START',
  IN_PROGRESS = 'IN_PROGRESS',
  WON = 'WON',
  LOST = 'LOST',
}

type State = {
  grid: SquareConfig[][] | undefined;
  setGrid: (newGrid: SquareConfig[][]) => void;
  startGame: () => void;
  setGameLost: () => void;
  restartGame: (gameSettings?: GameSettings) => void;
  numberOfFlaggedMines: () => number;
  isGridSquarePressed: boolean;
  numberOfMines: number;
  numberOfFlags: number;
  incrementFlag: () => void;
  decrementFlag: () => void;
  setIsGridSquarePressed: (isGridSquarePressed: boolean) => void;
  gameState: GameState;
};

export const useStore = create<State>(
  devtools((set, get) => {
    const grid = getInitialGrid();
    const numberOfMines = getNumberOfMines(grid);

    return {
      grid,
      numberOfMines,
      numberOfFlaggedMines: () => get().numberOfMines - get().numberOfFlags,
      setGrid: (newGrid) => {
        // check if the grid is a winning grid
        const isWinningGrid = checkIfWinningGrid(newGrid);

        // if it is then set the state as GameState.WON

        set((state) => ({
          ...state,
          gameState: isWinningGrid ? GameState.WON : state.gameState,
          grid: newGrid,
        }));
      },
      isGridSquarePressed: false,
      setIsGridSquarePressed: (isGridSquarePressed) =>
        set((state) => ({ ...state, isGridSquarePressed })),
      numberOfFlags: 0,
      incrementFlag: () =>
        set((state) => ({ ...state, numberOfFlags: state.numberOfFlags + 1 })),
      decrementFlag: () =>
        set((state) => ({ ...state, numberOfFlags: state.numberOfFlags - 1 })),
      gameState: GameState.BEFORE_START,
      startGame: () => {
        set((state) => ({ ...state, gameState: GameState.IN_PROGRESS }));
      },
      setGameLost: () => {
        set((state) => ({ ...state, gameState: GameState.LOST }));
      },
      restartGame: (gameSettings) =>
        set((state) => {
          const grid = getInitialGrid(gameSettings);
          const numberOfMines = gameSettings?.mines || getNumberOfMines(grid);

          return {
            ...state,
            grid,
            numberOfMines,
            numberOfFlags: 0,
            gameState: GameState.BEFORE_START,
          };
        }),
    };
  })
);
