import { AnimationKey } from './animationsConfig';
import { SquareConfig } from './types';

export function getSquareAnimationKey(
  square: SquareConfig,
  isPressed: boolean
): AnimationKey {
  if (isPressed) {
    return 'open';
  }

  if (!square.isOpen) {
    return 'closed';
  }

  if (square.isMine) {
    return 'blownUpMine';
  }

  if (square.numberOfSurroundingMines === 0) {
    return 'open';
  }

  return square.numberOfSurroundingMines.toString() as AnimationKey;
}
