import React from 'react';
import { Sprite } from 'react-konva';
import {
  FaceAnimationKey,
  faceButtonAnimationsConfig,
} from '../animationsConfig';
import { GameState, useStore } from '../store';

function getFaceAnimation(
  isPressed: boolean,
  isGridSquarePressed: boolean,
  gameState: GameState
): FaceAnimationKey {
  if (isPressed) {
    return 'pressedSmile';
  }
  if (gameState === GameState.LOST) {
    return 'sad';
  }
  if (gameState === GameState.WON) {
    return 'sunglasses';
  }
  if (isGridSquarePressed) {
    return 'surprised';
  }
  return 'smile';
}

interface Props {
  imageRef: HTMLImageElement;
  x: number;
  y: number;
  resetTimer: () => void;
}

export function FaceButton({ imageRef, x, y, resetTimer }: Props) {
  const isGridSquarePressed = useStore((state) => state.isGridSquarePressed);
  const restartGame = useStore((state) => state.restartGame);
  const gameState = useStore((state) => state.gameState);
  const [isPressed, setIsPressed] = React.useState<boolean>(false);

  return (
    <Sprite
      onMouseDown={() => {
        setIsPressed(true);
      }}
      onMouseUp={() => {
        setIsPressed(false);
        restartGame();
        resetTimer();
      }}
      animation={getFaceAnimation(isPressed, isGridSquarePressed, gameState)}
      image={imageRef as HTMLImageElement}
      animations={faceButtonAnimationsConfig}
      x={x}
      y={y}
    />
  );
}
