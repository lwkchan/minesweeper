import { GridAnimationKey } from "./animationsConfig";
import { SquareConfig } from "./types";

export function getSquareAnimationKey(
  square: SquareConfig,
  isPressed: boolean
): GridAnimationKey {
  if (isPressed) {
    return "open";
  }

  if (square.isFlagged) {
    return "flag";
  }

  if (!square.isOpen) {
    return "closed";
  }

  if (square.isIncorrectMine) {
    return "incorrectMine";
  }

  if (square.isBlownUpMine) {
    return "blownUpMine";
  }

  if (square.isMine && square.isOpen) {
    return "discoveredMine";
  }

  if (square.numberOfSurroundingMines === 0) {
    return "open";
  }

  return square.numberOfSurroundingMines.toString() as GridAnimationKey;
}
