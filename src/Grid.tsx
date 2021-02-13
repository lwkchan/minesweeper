import React from 'react';
import { Layer, Sprite, Stage } from 'react-konva';
import { animationsConfig } from './animationsConfig';
import { SQUARE_WIDTH } from './constants';
import { getInitialGrid } from './getInitialGrid';
import { getSquareAnimationKey } from './getSquareAnimationKey';
import { SquareConfig } from './types';

interface Props {
  imageRef: HTMLImageElement;
}

export function Grid({ imageRef }: Props) {
  const [grid, setGrid] = React.useState<SquareConfig[][] | undefined>(
    undefined
  );

  React.useLayoutEffect(() => {
    setGrid(getInitialGrid());
  }, []);

  if (!grid) {
    return null;
  }

  return (
    <Stage
      width={grid[0].length * SQUARE_WIDTH}
      height={grid.length * SQUARE_WIDTH}
    >
      <Layer>
        {grid.map((row, rowIndex) => {
          const x = (rowIndex + 1) * SQUARE_WIDTH;
          return row.map((square, columnIndex) => {
            const y = (columnIndex + 1) * SQUARE_WIDTH;
            return (
              <Sprite
                key={square.id}
                onMouseDown={() => {
                  if (square.isOpen) {
                    return;
                  }
                  setGrid((prevGrid) => {
                    const nextRow = [
                      ...(prevGrid as SquareConfig[][])[rowIndex],
                    ];
                    nextRow[columnIndex] = { ...square, isPressed: true };

                    const nextGrid = [...(prevGrid as SquareConfig[][])];
                    nextGrid[rowIndex] = nextRow;
                    return nextGrid;
                  });
                }}
                onMouseUp={() => {
                  setGrid((prevGrid) => {
                    const nextRow = [
                      ...(prevGrid as SquareConfig[][])[rowIndex],
                    ];
                    nextRow[columnIndex] = {
                      ...square,
                      isPressed: false,
                      isOpen: true,
                    };

                    const nextGrid = [...(prevGrid as SquareConfig[][])];
                    nextGrid[rowIndex] = nextRow;
                    return nextGrid;
                  });
                }}
                x={x}
                y={y}
                image={imageRef}
                animation={getSquareAnimationKey(square)}
                animations={animationsConfig}
              />
            );
          });
        })}
      </Layer>
    </Stage>
  );
}
