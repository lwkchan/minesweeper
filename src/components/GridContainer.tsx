import { Layer, Stage } from 'react-konva';
import { SQUARE_WIDTH } from '../constants';
import { GameState, useStore } from '../store';
import {
  getBailedOutGrid,
  getLosingGrid,
  getNextGrid,
  toggleFlag,
} from '../getNextGrid';
import { SquareConfig } from '../types';
import { useCountUp } from '../useCountUp';
import { TopDisplay, TOP_DISPLAY_HEIGHT } from './TopDisplay';
import { Grid } from './Grid';
import { MinesweeperWindow } from './MinesweeperWindow';

interface Props {
  imageRef: HTMLImageElement;
}

export function GridContainer({ imageRef }: Props) {
  const {
    grid,
    setGrid,
    setGameLost,
    startGame,
    gameState,
    incrementFlag: incrementFlagCount,
    decrementFlag: decrementFlagCount,
    setMinesweeperWindowClosed,
    restartGame,
    bailOutSquare,
  } = useStore();
  const { stopTimer, startTimer, time, isRunning, resetTimer } = useCountUp(
    gameState === GameState.LOST || gameState === GameState.WON
  );
  const gridWidth = grid ? grid[0].length * SQUARE_WIDTH : 0;
  const gridHeight = grid ? grid.length * SQUARE_WIDTH : 0;

  const handleGridSquareMouseUp = (
    rowIndex: number,
    columnIndex: number,
    square: SquareConfig
  ) => {
    if (!grid || gameState === GameState.LOST || gameState === GameState.WON) {
      return;
    }
    if (!isRunning && gameState === GameState.BEFORE_START) {
      startGame();
      startTimer();

      // handle any mines which are open on first click
      if (square.isMine) {
        const bailedOutGrid = getBailedOutGrid(
          grid,
          rowIndex,
          columnIndex,
          bailOutSquare
        );

        const nextGrid = getNextGrid(
          bailedOutGrid,
          bailedOutGrid[rowIndex][columnIndex],
          rowIndex,
          columnIndex
        );

        setGrid(nextGrid);

        return;
      }
    }
    if (square.isMine && gameState !== GameState.BEFORE_START) {
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
  };

  const handleGridSquareRightClick = (
    rowIndex: number,
    columnIndex: number,
    square: SquareConfig
  ) => {
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

    setGrid(nextGrid);
  };

  if (!grid) {
    return null;
  }

  return (
    <MinesweeperWindow
      onClose={(x, y) => {
        setMinesweeperWindowClosed(x, y);
        restartGame(); // restart for next time
      }}
      width={gridWidth}
    >
      <Stage width={gridWidth} height={gridHeight + TOP_DISPLAY_HEIGHT}>
        <Layer>
          <TopDisplay
            width={gridWidth}
            imageRef={imageRef}
            resetTimer={resetTimer}
            time={time}
          />
          <Grid
            grid={grid}
            gameState={gameState}
            handleGridSquareMouseUp={handleGridSquareMouseUp}
            handleGridSquareRightClick={handleGridSquareRightClick}
            imageRef={imageRef}
          />
        </Layer>
      </Stage>
    </MinesweeperWindow>
  );
}
