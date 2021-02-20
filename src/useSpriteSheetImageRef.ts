import React from 'react';
import shallow from 'zustand/shallow';
import { useStore } from './store';
import minesweeperSpriteSheet from './minesweeperSprite.png';

// returns if it's loaded
export function useSpriteSheetImageRef(): HTMLImageElement | undefined {
  const [imageRef, setImageRef] = useStore(
    ({ imageRef, setImageRef }) => [imageRef, setImageRef],
    shallow
  );

  React.useEffect(() => {
    // set up imageRef
    console.log('hereeee');
    const image = new Image();
    image.src = minesweeperSpriteSheet;
    const loadListener = () => setImageRef(image);
    image.addEventListener('load', loadListener);

    return () => image.removeEventListener('load', loadListener);
  }, [setImageRef]);

  return imageRef;
}
