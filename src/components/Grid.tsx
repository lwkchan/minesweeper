import { Layer, Stage, Rect, Group } from 'react-konva';
import { SQUARE_WIDTH } from '../constants';
import { GameState, useStore } from '../store';
import { getLosingGrid, getNextGrid, toggleFlag } from '../getNextGrid';
import { GridSquare } from './GridSquare';
import { SquareConfig } from '../types';
import { FaceButton } from './FaceButton';
import {
  ThreeDigitsDisplay,
  THREE_DIGITS_DISPLAY_WIDTH,
} from './ThreeDigitsDisplay';

interface Props {
  imageRef: HTMLImageElement;
}

export function Grid({ imageRef }: Props) {
  const {
    grid,
    setGrid,
    setGameState,
    gameState,
    incrementFlag,
    decrementFlag,
    numberOfFlaggedMines,
  } = useStore();
  const gridWidth = grid ? grid[0].length * SQUARE_WIDTH : 0;
  const gridHeight = grid ? grid.length * SQUARE_WIDTH : 0;

  if (!grid) {
    return null;
  }

  function handleGridSquareMouseUp(
    rowIndex: number,
    columnIndex: number,
    square: SquareConfig
  ) {
    if (gameState === GameState.LOST) {
      return;
    }
    if (square.isMine) {
      setGameState(GameState.LOST);
      const losingGrid = getLosingGrid(
        grid as SquareConfig[][],
        square,
        rowIndex,
        columnIndex
      );
      setGrid(losingGrid);
      return;
    }
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
    if (gameState === GameState.LOST) {
      return;
    }

    // if no flag, add a flag to counter
    if (square.isFlagged) {
      decrementFlag();
    } else {
      incrementFlag();
    }
    const nextGrid = toggleFlag(
      grid as SquareConfig[][],
      square,
      rowIndex,
      columnIndex
    );

    setGrid(nextGrid as SquareConfig[][]);
  }

  return (
    <Stage
      style={{
        width: gridWidth,
        height: gridHeight,
      }}
      width={gridWidth}
      height={gridHeight + 52}
    >
      <Layer>
        <Group>
          <Rect fill="silver" x={0} y={0} width={gridWidth} height={52} />
          <ThreeDigitsDisplay
            imageRef={imageRef}
            x={0}
            y={0}
            number={numberOfFlaggedMines()}
          />
          <FaceButton imageRef={imageRef} x={gridWidth / 2} y={52 / 2} />
          <ThreeDigitsDisplay
            imageRef={imageRef}
            x={gridWidth - THREE_DIGITS_DISPLAY_WIDTH}
            y={0}
            number={123}
          />
        </Group>
        <Group>
          {grid.map((row, rowIndex) => {
            const x = rowIndex * SQUARE_WIDTH;
            return row.map((square, columnIndex) => {
              const y = columnIndex * SQUARE_WIDTH + 52;
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
      </Layer>
    </Stage>
  );
}
