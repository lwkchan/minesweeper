import React from 'react';
import { Grid } from './Grid';
import minesweeperSpriteSheet from '../minesweeperSprite.png';
import './App.css';

function App() {
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

  return <Grid imageRef={imageRef} />;
}

export default App;
