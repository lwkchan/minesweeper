import React from 'react';
import { KonvaEventObject } from 'konva/types/Node';
import { Sprite } from 'react-konva';
import { animationsConfig } from '../animationsConfig';
import { getSquareAnimationKey } from '../getSquareAnimationKey';
import { SquareConfig } from '../types';

const mouseButton: { [key: string]: number } = {
  leftClick: 0,
  rightClick: 2,
};

interface Props {
  onMouseUp: (event: KonvaEventObject<MouseEvent>) => void;
  onRightClick: (event: KonvaEventObject<MouseEvent>) => void;
  x: number;
  y: number;
  square: SquareConfig;
  imageRef: HTMLImageElement;
  isGameLost: boolean;
}

export function GridSquare({
  onMouseUp,
  imageRef,
  square,
  isGameLost,
  x,
  y,
  onRightClick,
}: Props) {
  const [isPressed, setIsPressed] = React.useState<boolean>(false);
  return (
    <Sprite
      onMouseDown={(e) => {
        if (isGameLost) {
          return;
        }
        if (e.evt.button === mouseButton.rightClick) {
          onRightClick(e);
          return;
        }
        if (square.isOpen || square.isFlagged) {
          return;
        }
        setIsPressed(true);
      }}
      onMouseUp={(e) => {
        if (e.evt.button === mouseButton.rightClick) {
          return;
        }
        setIsPressed(false);
        onMouseUp(e);
      }}
      onContextMenu={(e) => {
        e.evt.preventDefault();
      }}
      x={x}
      y={y}
      image={imageRef}
      animation={getSquareAnimationKey(square, isPressed)}
      animations={animationsConfig}
    />
  );
}
