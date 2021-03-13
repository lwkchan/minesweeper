export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  EXPERT = 'EXPERT',
  CUSTOM = 'CUSTOM',
}

export type GameSettings = { height: number; width: number; mines: number };

type GameSettingsConfig = Partial<Record<Difficulty, GameSettings>>;

export const gameSettingsConfig: GameSettingsConfig = {
  EASY: { height: 9, width: 9, mines: 10 },
  MEDIUM: { height: 16, width: 16, mines: 40 },
  EXPERT: { height: 16, width: 30, mines: 99 },
};
