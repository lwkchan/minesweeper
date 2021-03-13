import React from 'react';
import minesweeperSpriteSheet from '../assets/minesweeperSprite.png';
import { useStore } from '../store';
import { GameSettingsForm } from './GameSettingsForm/GameSettingsForm';
import { GridContainer } from './GridContainer';
import { WindowContainer } from './WindowContainer';

export function Minesweeper() {
  const { isSettingsWindowOpen, handleSettingsClose } = useStore((s) => ({
    isSettingsWindowOpen: s.isSettingsWindowOpen,
    handleSettingsClose: s.setSettingsWindowClosed,
  }));
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
    <>
      <GridContainer imageRef={imageRef} />;
      {isSettingsWindowOpen && (
        <WindowContainer
          windowTitle="Minesweeper Settings"
          width={480}
          onClose={handleSettingsClose}
        >
          <div className="window-body">
            <GameSettingsForm />
          </div>
        </WindowContainer>
      )}
    </>
  );
}
