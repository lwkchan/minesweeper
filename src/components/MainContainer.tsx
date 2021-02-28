import { Layer, Stage } from 'react-konva';
import { SQUARE_WIDTH } from '../constants';
import { GameState, useStore } from '../store';
import { getLosingGrid, getNextGrid, toggleFlag } from '../getNextGrid';
import { SquareConfig } from '../types';
import { useCountUp } from '../useCountUp';
import { TopDisplay } from './TopDisplay';
import { Grid } from './Grid';

interface Props {
  imageRef: HTMLImageElement;
}

export function MainContainer({ imageRef }: Props) {
  const {
    grid,
    setGrid,
    setGameLost,
    startGame,
    gameState,
    incrementFlag: incrementFlagCount,
    decrementFlag: decrementFlagCount,
  } = useStore();
  const { stopTimer, startTimer, time, isRunning, resetTimer } = useCountUp(
    gameState === GameState.LOST || gameState === GameState.WON
  );
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
    if (gameState === GameState.LOST || gameState === GameState.WON) {
      return;
    }
    if (!isRunning && gameState === GameState.BEFORE_START) {
      startGame();
      startTimer();
    }
    if (square.isMine) {
      stopTimer();
      setGameLost();
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
    if (gameState === GameState.BEFORE_START) {
      startGame();
      startTimer();
    }

    if (square.isOpen) {
      return;
    }

    // if no flag, add a flag to counter
    if (square.isFlagged) {
      decrementFlagCount();
    } else {
      incrementFlagCount();
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
        <TopDisplay
          width={gridWidth}
          imageRef={imageRef}
          resetTimer={resetTimer}
          time={time}
        />
        <Grid
          handleGridSquareMouseUp={handleGridSquareMouseUp}
          handleGridSquareRightClick={handleGridSquareRightClick}
          imageRef={imageRef}
        />
      </Layer>
    </Stage>
  );
}
