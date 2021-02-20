import create from 'zustand';
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
  gameState: GameState;
};

export const useStore = create<State>((set) => ({
  imageRef: undefined,
  setImageRef: (imageRef) => {
    set((state) => ({ ...state, imageRef }));
  },
  grid: undefined,
  setGrid: (newGrid) => set((state) => ({ ...state, grid: newGrid })),
  gameState: GameState.BEFORE_START,
  setGameState: (gameState) => set((state) => ({ ...state, gameState })),
}));
