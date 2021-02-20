export const gridAnimationsConfig = {
  closed: [0, 51, 16, 16],
  open: [17, 51, 16, 16],
  flag: [34, 51, 16, 16],
  questionMarkClosed: [51, 51, 16, 16],
  questionMarkOpen: [68, 51, 16, 16],
  discoveredMine: [85, 51, 16, 16],
  blownUpMine: [102, 51, 16, 16],
  incorrectMine: [119, 51, 16, 16],
  '1': [0, 68, 16, 16],
  '2': [17, 68, 16, 16],
  '3': [34, 68, 16, 16],
  '4': [51, 68, 16, 16],
  '5': [68, 68, 16, 16],
  '6': [85, 68, 16, 16],
  '7': [102, 68, 16, 16],
  '8': [119, 68, 16, 16],
};

export type GridAnimationKey = keyof typeof gridAnimationsConfig;

export const faceButtonAnimationsConfig = {
  smile: [0, 24, 26, 26],
  pressedSmile: [27, 24, 26, 26],
  surprised: [54, 24, 26, 26],
  sunglasses: [81, 24, 26, 26],
  sad: [108, 24, 26, 26],
};

export type FaceAnimationKey = keyof typeof faceButtonAnimationsConfig;
