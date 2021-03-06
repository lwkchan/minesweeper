import React from 'react';
import minesweeperSpriteSheet from '../assets/minesweeperSprite.png';
import { GridContainer } from './GridContainer';

export function Minesweeper() {
  const [imageRef, setImageRef] = React.useState<undefined | HTMLImageElement>(
    undefined
  );

  React.useEffect(() => {
    // set up imageRef
    const image = new Image();
    image.src = minesweeperSpriteSheet;

    const loadListener = () => setImageRef(image);

    image.addEventListener('load', loadListener);

    return () => image.removeEventListener('load', loadListener);
  }, []);

  if (!imageRef) {
    return null;
  }

  return <GridContainer imageRef={imageRef} />;
}
