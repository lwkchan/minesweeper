import React from "react";
import { KonvaEventObject } from "konva/types/Node";
import { Sprite } from "react-konva";
import { gridAnimationsConfig } from "../animationsConfig";
import { getSquareAnimationKey } from "../getSquareAnimationKey";
import { SquareConfig } from "../types";
import { useStore } from "../store";

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
  isGameLost: boolean;
  imageRef: HTMLImageElement;
}

export function GridSquare({
  onMouseUp,
  square,
  isGameLost,
  x,
  y,
  onRightClick,
  imageRef,
}: Props) {
  const [isPressed, setIsPressed] = React.useState<boolean>(false);
  const setIsGridSquarePressed = useStore(
    (state) => state.setIsGridSquarePressed
  );

  function handlePress(isPressed: boolean) {
    setIsPressed(isPressed);
    setIsGridSquarePressed(isPressed);
  }

  return (
    <Sprite
      onMouseLeave={() => setIsPressed(false)}
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
        handlePress(true);
      }}
      onMouseUp={(e) => {
        if (e.evt.button === mouseButton.rightClick || square.isFlagged) {
          return;
        }
        handlePress(false);
        onMouseUp(e);
      }}
      onContextMenu={(e) => {
        e.evt.preventDefault();
      }}
      x={x}
      y={y}
      image={imageRef}
      animation={getSquareAnimationKey(square, isPressed)}
      animations={gridAnimationsConfig}
    />
  );
}
