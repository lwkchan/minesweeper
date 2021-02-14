import React from 'react';
import { Sprite } from 'react-konva';
import { animationsConfig } from './animationsConfig';
import { getSquareAnimationKey } from './getSquareAnimationKey';
import { SquareConfig } from './types';

interface Props {
  onMouseUp: () => void;
  x: number;
  y: number;
  square: SquareConfig;
  imageRef: HTMLImageElement;
}

export function GridSquare({ onMouseUp, imageRef, square, x, y }: Props) {
  const [isPressed, setIsPressed] = React.useState<boolean>(false);
  return (
    <Sprite
      onMouseDown={() => {
        if (square.isOpen) {
          return;
        }
        setIsPressed(true);
      }}
      onMouseUp={() => {
        setIsPressed(false);
        onMouseUp();
      }}
      x={x}
      y={y}
      image={imageRef}
      animation={getSquareAnimationKey(square, isPressed)}
      animations={animationsConfig}
    />
  );
}
