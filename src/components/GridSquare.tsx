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
}

export function GridSquare({
  onMouseUp,
  imageRef,
  square,
  x,
  y,
  onRightClick,
}: Props) {
  const [isPressed, setIsPressed] = React.useState<boolean>(false);
  return (
    <Sprite
      onMouseDown={(e) => {
        if (e.evt.button === mouseButton.rightClick) {
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
        onRightClick(e);
      }}
      x={x}
      y={y}
      image={imageRef}
      animation={getSquareAnimationKey(square, isPressed)}
      animations={animationsConfig}
    />
  );
}
