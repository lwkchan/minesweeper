export type SquareConfig = {
  id: string;
  isMine: boolean;
  isOpen: boolean;
  isBlownUpMine?: boolean;
  isFlagged?: boolean;
  isIncorrectMine?: boolean;
  numberOfSurroundingMines: number;
};

export type BailOutSquare = [number, number];
