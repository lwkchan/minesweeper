import { Rect, Group } from "react-konva";
import { useStore } from "../store";
import {
  ThreeDigitsDisplay,
  THREE_DIGITS_DISPLAY_HEIGHT,
  THREE_DIGITS_DISPLAY_WIDTH,
} from "./ThreeDigitsDisplay";
import { FaceButton, FACE_BUTTON_HEIGHT } from "./FaceButton";

export const TOP_DISPLAY_HEIGHT = 52;
const SIDE_PADDING = 5;

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
      <Rect
        fill="silver"
        x={0}
        y={0}
        width={width}
        height={TOP_DISPLAY_HEIGHT}
      />
      <ThreeDigitsDisplay
        imageRef={imageRef}
        x={0 + SIDE_PADDING}
        y={TOP_DISPLAY_HEIGHT / 2 - THREE_DIGITS_DISPLAY_HEIGHT / 2}
        number={numberOfFlaggedMines()}
      />
      <FaceButton
        resetTimer={resetTimer}
        imageRef={imageRef}
        x={width / 2 - FACE_BUTTON_HEIGHT / 2}
        y={TOP_DISPLAY_HEIGHT / 2 - FACE_BUTTON_HEIGHT / 2}
      />
      <ThreeDigitsDisplay
        imageRef={imageRef}
        x={width - THREE_DIGITS_DISPLAY_WIDTH - SIDE_PADDING}
        y={TOP_DISPLAY_HEIGHT / 2 - THREE_DIGITS_DISPLAY_HEIGHT / 2}
        number={time}
      />
    </Group>
  );
}
