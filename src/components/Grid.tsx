import { Group } from 'react-konva';
import { SQUARE_WIDTH } from '../constants';
import { GameState } from '../store';
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
  grid: SquareConfig[][];
  gameState: GameState;
}

export function Grid({
  imageRef,
  handleGridSquareRightClick,
  handleGridSquareMouseUp,
  grid,
  gameState,
}: Props) {
  return (
    <Group>
      {(grid as SquareConfig[][]).map((row, rowIndex) => {
        return row.map((square, columnIndex) => {
          const x = columnIndex * SQUARE_WIDTH;
          const y = rowIndex * SQUARE_WIDTH + TOP_DISPLAY_HEIGHT;

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
