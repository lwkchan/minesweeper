import React from 'react';
import { MainContainer } from './MainContainer';
import minesweeperSpriteSheet from '../assets/minesweeperSprite.png';
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

  return <MainContainer imageRef={imageRef} />;
}

export default App;
