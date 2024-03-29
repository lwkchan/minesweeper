export enum Difficulty {
  EASY = "Easy",
  MEDIUM = "Medium",
  EXPERT = "Expert",
  CUSTOM = "Custom",
}

export type GameSettings = { height: number; width: number; mines: number };

type GameSettingsConfig = Partial<Record<Difficulty, GameSettings>>;

export const gameSettingsConfig: GameSettingsConfig = {
  [Difficulty.EASY]: { height: 9, width: 9, mines: 10 },
  [Difficulty.MEDIUM]: { height: 16, width: 16, mines: 40 },
  [Difficulty.EXPERT]: { height: 16, width: 30, mines: 99 },
};
