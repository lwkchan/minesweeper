import { Rect, Group } from 'react-konva';
import { useStore } from '../store';
import {
  ThreeDigitsDisplay,
  THREE_DIGITS_DISPLAY_WIDTH,
} from './ThreeDigitsDisplay';
import { FaceButton } from './FaceButton';

interface Props {
  width: number;
  imageRef: HTMLImageElement;
  resetTimer: () => void;
  time: number;
}

export function TopDisplay({ width, imageRef, resetTimer, time }: Props) {
  const numberOfFlaggedMines = useStore((s) => s.numberOfFlaggedMines);

  return (
    <Group>
      <Rect fill="silver" x={0} y={0} width={width} height={52} />
      <ThreeDigitsDisplay
        imageRef={imageRef}
        x={0}
        y={0}
        number={numberOfFlaggedMines()}
      />
      <FaceButton
        resetTimer={resetTimer}
        imageRef={imageRef}
        x={width / 2}
        y={52 / 2 - 26 / 2}
      />
      <ThreeDigitsDisplay
        imageRef={imageRef}
        x={width - THREE_DIGITS_DISPLAY_WIDTH}
        y={0}
        number={time}
      />
    </Group>
  );
}
