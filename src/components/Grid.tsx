import React from 'react';
import produce from 'immer';
import { Layer, Stage } from 'react-konva';
import { SQUARE_WIDTH } from '../constants';
import { getInitialGrid } from '../getInitialGrid';
import { getNextGrid } from '../getNextGrid';
import { GridSquare } from './GridSquare';
import { SquareConfig } from '../types';

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

  function handleGridSquareMouseUp(
    rowIndex: number,
    columnIndex: number,
    square: SquareConfig
  ) {
    const nextGrid = getNextGrid(
      grid as SquareConfig[][],
      square,
      rowIndex,
      columnIndex
    );
    setGrid(nextGrid);
  }

  function handleGridSquareRightClick(
    rowIndex: number,
    columnIndex: number,
    square: SquareConfig
  ) {
    const nextGrid = produce(grid, (draftGrid) => {
      (draftGrid as SquareConfig[][])[rowIndex][
        columnIndex
      ].isFlagged = !square.isFlagged;
    });
    setGrid(nextGrid);
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
              <GridSquare
                key={square.id}
                square={square}
                onRightClick={() =>
                  handleGridSquareRightClick(rowIndex, columnIndex, square)
                }
                onMouseUp={() =>
                  handleGridSquareMouseUp(rowIndex, columnIndex, square)
                }
                imageRef={imageRef}
                x={x}
                y={y}
              />
            );
          });
        })}
      </Layer>
    </Stage>
  );
}
