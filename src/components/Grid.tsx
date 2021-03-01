import { Group } from 'react-konva';
import { SQUARE_WIDTH } from '../constants';
import { GameState, useStore } from '../store';
import { SquareConfig } from '../types';
import { GridSquare } from './GridSquare';
import { TOP_DISPLAY_HEIGHT } from './TopDisplay';

interface Props {
  imageRef: HTMLImageElement;
  handleGridSquareRightClick: (
    rowIndex: number,
    columnIndex: number,
    square: SquareConfig
  ) => void;
  handleGridSquareMouseUp: (
    rowIndex: number,
    columnIndex: number,
    square: SquareConfig
  ) => void;
}

export function Grid({
  imageRef,
  handleGridSquareRightClick,
  handleGridSquareMouseUp,
}: Props) {
  const { grid, gameState } = useStore((s) => ({
    grid: s.grid,
    gameState: s.gameState,
  }));
  return (
    <Group>
      {(grid as SquareConfig[][]).map((row, rowIndex) => {
        const x = rowIndex * SQUARE_WIDTH;
        return row.map((square, columnIndex) => {
          const y = columnIndex * SQUARE_WIDTH + TOP_DISPLAY_HEIGHT;
          return (
            <GridSquare
              key={square.id}
              imageRef={imageRef}
              square={square}
              isGameLost={gameState === GameState.LOST}
              onRightClick={() =>
                handleGridSquareRightClick(rowIndex, columnIndex, square)
              }
              onMouseUp={() =>
                handleGridSquareMouseUp(rowIndex, columnIndex, square)
              }
              x={x}
              y={y}
            />
          );
        });
      })}
    </Group>
  );
}
