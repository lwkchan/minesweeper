import { Sprite } from 'react-konva';
import {
  FaceAnimationKey,
  faceButtonAnimationsConfig,
} from '../animationsConfig';

interface Props {
  imageRef: HTMLImageElement;
}

export function FaceButton({ imageRef }: Props) {
  function getFaceAnimation(): FaceAnimationKey {
    return 'smile';
  }

  return (
    <Sprite
      animation={getFaceAnimation()}
      image={imageRef as HTMLImageElement}
      animations={faceButtonAnimationsConfig}
      x={0}
      y={0}
    />
  );
}
