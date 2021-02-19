export type SquareConfig = {
  id: string;
  isMine: boolean;
  isOpen: boolean;
  isFlagged?: boolean;
  numberOfSurroundingMines: number;
};
