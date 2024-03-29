import create from "zustand";
import { devtools } from "zustand/middleware";
import { checkIfWinningGrid } from "./gridLogic/checkIfWinningGrid";
import {
  Difficulty,
  GameSettings,
  gameSettingsConfig,
} from "./gameDifficultyConfig";
import { getInitialGrid } from "./gridLogic/getInitialGrid";
import { BailOutSquare, SquareConfig } from "./types";

function getNumberOfMines(grid: SquareConfig[][]): number {
  return grid.flat().filter((square) => square.isMine).length;
}

export enum GameState {
  BEFORE_START = "BEFORE_START",
  IN_PROGRESS = "IN_PROGRESS",
  WON = "WON",
  LOST = "LOST",
}

type State = {
  grid: SquareConfig[][] | undefined;
  // Guarantees that the first square will never be a bomb
  bailOutSquare: BailOutSquare;
  isMineSweeperWindowOpen: boolean;
  setMinesweeperWindowOpen: () => void;
  setMinesweeperWindowClosed: (lastX: number, lastY: number) => void;
  setAboutWindowOpen: () => void;
  setAboutWindowClosed: () => void;
  isAboutWindowOpen: boolean;
  minesweeperWindowX?: number;
  minesweeperWindowY?: number;
  isSettingsWindowOpen: boolean;
  setSettingsWindowOpen: () => void;
  setSettingsWindowClosed: () => void;
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
  currentGameSettingsConfig: GameSettings;
};

export const useStore = create<State>(
  devtools((set, get) => {
    const [grid, bailOutSquare] = getInitialGrid();
    const numberOfMines = getNumberOfMines(grid);

    return {
      isMineSweeperWindowOpen: false,
      setMinesweeperWindowOpen: () => {
        set((state) => {
          return {
            ...state,
            isMineSweeperWindowOpen: true,
          };
        });
      },
      setMinesweeperWindowClosed: (lastX, lastY) => {
        set((state) => ({
          ...state,
          isMineSweeperWindowOpen: false,
          minesweeperWindowX: lastX,
          minesweeperWindowY: lastY,
        }));
      },
      isAboutWindowOpen: false,
      setAboutWindowOpen: () => {
        set((state) => ({ ...state, isAboutWindowOpen: true }));
      },
      setAboutWindowClosed: () => {
        set((state) => ({ ...state, isAboutWindowOpen: false }));
      },
      isSettingsWindowOpen: false,
      setSettingsWindowOpen: () => {
        set((state) => ({ ...state, isSettingsWindowOpen: true }));
      },
      setSettingsWindowClosed: () => {
        set((state) => ({ ...state, isSettingsWindowOpen: false }));
      },
      grid,
      bailOutSquare,
      numberOfMines,
      numberOfFlaggedMines: () => get().numberOfMines - get().numberOfFlags,
      setGrid: (newGrid) => {
        const isWinningGrid = checkIfWinningGrid(newGrid);

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
      currentGameSettingsConfig: gameSettingsConfig[
        Difficulty.MEDIUM
      ] as GameSettings,
      restartGame: (newGameSettings?: GameSettings) => {
        set((state) => {
          const nextGameSettings =
            newGameSettings || get().currentGameSettingsConfig;
          const [grid, bailOutSquare] = getInitialGrid(nextGameSettings);
          const numberOfMines =
            nextGameSettings?.mines || getNumberOfMines(grid);

          return {
            ...state,
            grid,
            bailOutSquare,
            numberOfMines,
            numberOfFlags: 0,
            currentGameSettingsConfig: nextGameSettings,
            gameState: GameState.BEFORE_START,
          };
        });
      },
    };
  })
);
