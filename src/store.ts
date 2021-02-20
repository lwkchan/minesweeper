import create from 'zustand';
import { getInitialGrid } from './getInitialGrid';
import { SquareConfig } from './types';

export enum GameState {
  BEFORE_START = 'BEFORE_START',
  IN_PROGRESS = 'IN_PROGRESS',
  WON = 'WON',
  LOST = 'LOST',
}

type State = {
  grid: SquareConfig[][] | undefined;
  imageRef: HTMLImageElement | undefined;
  setImageRef: (image: HTMLImageElement) => void;
  setGrid: (newGrid: SquareConfig[][]) => void;
  setGameState: (gameState: GameState) => void;
  restartGame: () => void;
  isGridSquarePressed: boolean;
  setIsGridSquarePressed: (isGridSquarePressed: boolean) => void;
  gameState: GameState;
};

export const useStore = create<State>((set) => ({
  imageRef: undefined,
  setImageRef: (imageRef) => {
    set((state) => ({ ...state, imageRef }));
  },
  grid: getInitialGrid(),
  setGrid: (newGrid) => set((state) => ({ ...state, grid: newGrid })),
  isGridSquarePressed: false,
  setIsGridSquarePressed: (isGridSquarePressed) =>
    set((state) => ({ ...state, isGridSquarePressed })),
  gameState: GameState.BEFORE_START,
  setGameState: (gameState) => set((state) => ({ ...state, gameState })),
  restartGame: () =>
    set((state) => ({
      ...state,
      grid: getInitialGrid(),
      gameState: GameState.BEFORE_START,
    })),
}));
