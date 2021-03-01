import React from 'react';
import minesweeperSpriteSheet from './assets/minesweeperSprite.png';

// returns if it's loaded
export function useSpriteSheetImageRef(): HTMLImageElement | undefined {
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
  }, [setImageRef]);

  return imageRef;
}
