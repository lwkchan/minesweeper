import create from 'zustand';
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
  setGameState: (gameState: GameState) => void;
  restartGame: () => void;
  numberOfFlaggedMines: () => number;
  isGridSquarePressed: boolean;
  numberOfMines: number;
  numberOfFlags: number;
  incrementFlag: () => void;
  decrementFlag: () => void;
  setIsGridSquarePressed: (isGridSquarePressed: boolean) => void;
  gameState: GameState;
};

export const useStore = create<State>((set, get) => {
  const grid = getInitialGrid();
  const numberOfMines = getNumberOfMines(grid);

  return {
    grid,
    numberOfMines,
    numberOfFlaggedMines: () => get().numberOfMines - get().numberOfFlags,
    setGrid: (newGrid) => set((state) => ({ ...state, grid: newGrid })),
    isGridSquarePressed: false,
    setIsGridSquarePressed: (isGridSquarePressed) =>
      set((state) => ({ ...state, isGridSquarePressed })),
    numberOfFlags: 0,
    incrementFlag: () =>
      set((state) => ({ ...state, numberOfFlags: state.numberOfFlags + 1 })),
    decrementFlag: () =>
      set((state) => ({ ...state, numberOfFlags: state.numberOfFlags - 1 })),
    gameState: GameState.BEFORE_START,
    setGameState: (gameState) => set((state) => ({ ...state, gameState })),
    restartGame: () =>
      set((state) => {
        const grid = getInitialGrid();
        const numberOfMines = getNumberOfMines(grid);

        return {
          ...state,
          grid,
          numberOfMines,
          numberOfFlags: 0,
          gameState: GameState.BEFORE_START,
        };
      }),
  };
});
