import React, { useEffect } from 'react';
import minesweeperSpriteSheet from './minesweeperSprite.png';

import './App.css';
import { Grid } from './Grid';

function App() {
  const [imageRef, setImageRef] = React.useState<undefined | HTMLImageElement>(
    undefined
  );

  useEffect(() => {
    // set up imageRef
    const image = new Image();
    image.src = minesweeperSpriteSheet;
    setImageRef(image);
  }, []);

  if (!imageRef) {
    return null;
  }

  return <Grid imageRef={imageRef} />;
}

export default App;
