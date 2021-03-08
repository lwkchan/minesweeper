import React from 'react';
import minesweeperIcon from '../assets/minesweeperIcon.png';
import { useStore } from '../store';
import { useHandleClickAway } from '../useHandleClickAway';

import './MinesweeperWindow.css';
import { WindowContainer } from './WindowContainer';

interface Props {
  width: number;
  children: React.ReactNode;
  onClose: (x: number, y: number) => void;
}

export function MinesweeperWindow({ width, children, onClose }: Props) {
  const [isFileMenuOpen, setIsFileMenuOpen] = React.useState(false);
  const { setSettingsWindowOpen, initialX, initialY } = useStore((s) => ({
    setSettingsWindowOpen: s.setSettingsWindowOpen,
    initialX: s.minesweeperWindowX,
    initialY: s.minesweeperWindowY,
  }));
  const fileMenuRef = React.useRef<HTMLDivElement>(null);

  useHandleClickAway(() => {
    setIsFileMenuOpen(false);
  }, fileMenuRef);

  function handleFileOpen() {
    setIsFileMenuOpen(true);
  }

  function handleSettingsClick() {
    setIsFileMenuOpen(false);
    setSettingsWindowOpen();
  }

  return (
    <WindowContainer
      iconSrc={minesweeperIcon}
      iconAlt="Minesweeper Icon"
      onClose={onClose}
      width={width}
      initialX={initialX}
      initialY={initialY}
      windowTitle="Minesweeper"
    >
      <div className="MinesweeperWindow__menuContents">
        <button
          onClick={handleFileOpen}
          className={`MinesweeperWindow__menuButton ${
            isFileMenuOpen ? 'MinesweeperWindow__menuButton--active' : ''
          }`}
        >
          File
        </button>
        {isFileMenuOpen && (
          <div ref={fileMenuRef} className="MinesweeperWindow__fileMenu">
            <ul>
              <li role="button" onClick={handleSettingsClick}>
                Settings
              </li>
            </ul>
          </div>
        )}
      </div>
      {children}
    </WindowContainer>
  );
}
