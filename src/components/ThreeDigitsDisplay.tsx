import { Sprite } from "react-konva";
import { numberAnimationsConfig } from "../animationsConfig";

interface Props {
  number: number;
  imageRef: HTMLImageElement;
  x: number;
  y: number;
}

export const DIGIT_WIDTH = 13;
export const THREE_DIGITS_DISPLAY_WIDTH = DIGIT_WIDTH * 3;
export const THREE_DIGITS_DISPLAY_HEIGHT = 23;

function getDigitsFromNumber(number: number): [string, string, string] {
  return number.toString().padStart(3, "0").split("").slice(0, 3) as [
    string,
    string,
    string
  ];
}

export function ThreeDigitsDisplay({ number, imageRef, x, y }: Props) {
  const [firstDigit, secondDigit, thirdDigit] = getDigitsFromNumber(number);
  return (
    <>
      <Sprite
        image={imageRef}
        animation={firstDigit}
        animations={numberAnimationsConfig}
        x={x}
        y={y}
      />
      <Sprite
        image={imageRef}
        animation={secondDigit}
        x={x + DIGIT_WIDTH}
        y={y}
        animations={numberAnimationsConfig}
      />
      <Sprite
        image={imageRef}
        animation={thirdDigit}
        x={x + DIGIT_WIDTH * 2}
        y={y}
        animations={numberAnimationsConfig}
      />
    </>
  );
}
