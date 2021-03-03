import React from 'react';
import { GridContainer } from './GridContainer';
import minesweeperSpriteSheet from '../assets/minesweeperSprite.png';
import './App.css';
import { GameSettingsForm } from './GameSettingsForm';

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

  return (
    <div>
      <GameSettingsForm />
      <GridContainer imageRef={imageRef} />;
    </div>
  );
}

export default App;
