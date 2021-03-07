import React from 'react';
import minesweeperIcon from '../assets/minesweeperIcon.png';
import { useStore } from '../store';

import './MinesweeperWindow.css';
import { WindowContainer } from './WindowContainer';

interface Props {
  width: number;
  children: React.ReactNode;
  onClose: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  initialX?: number;
  initialY?: number;
}

export function MinesweeperWindow({ width, children, onClose }: Props) {
  const [isFileMenuOpen, setIsFileMenuOpen] = React.useState(false);
  const setSettingsWindowOpen = useStore((s) => s.setSettingsWindowOpen);

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
          <div className="MinesweeperWindow__fileMenu">
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
