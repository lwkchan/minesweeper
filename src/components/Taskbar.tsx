import React from 'react';
import minesweeperLogo from '../assets/minesweeperStartLogo.png';
import { useStore } from '../store';
import { useHandleClickAway } from '../useHandleClickAway';
import './Taskbar.css';

export function Taskbar() {
  const openMinesweeper = useStore((s) => s.setMinesweeperWindowOpen);
  const openAboutWindow = useStore((s) => s.setAboutWindowOpen);
  const [showMenu, setShowMenu] = React.useState(false);
  const taskbarRef = React.useRef<HTMLDivElement>(null);

  useHandleClickAway(() => {
    setShowMenu(false);
  }, taskbarRef);

  function handleStartClick() {
    setShowMenu(!showMenu);
  }

  function handleShowMinesweeper() {
    openMinesweeper();
    setShowMenu(false);
  }

  function handleOpenAboutWindow() {
    openAboutWindow();
    setShowMenu(false);
  }

  return (
    <div ref={taskbarRef} className="taskbar">
      <button
        onClick={handleStartClick}
        className={`taskbar__start ${showMenu ? 'taskbar__start--open' : ''}`}
      ></button>
      {showMenu && (
        <div className="window taskbar__startMenu">
          <ul className="taskbar__startMenuList">
            <li
              role="button"
              onClick={handleShowMinesweeper}
              className="taskbar__startMenuItem noHighlight"
            >
              <img
                src={minesweeperLogo}
                alt="Minesweeper logo"
                className="taskbar__startMenuItem__logo"
              />
              <p>Minesweeper</p>
            </li>
            <li
              role="button"
              onClick={handleOpenAboutWindow}
              className="taskbar__startMenuItem noHighlight"
            >
              <img
                src={minesweeperLogo}
                alt="Question mark"
                className="taskbar__startMenuItem__logo"
              />
              <p>About</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
