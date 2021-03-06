import React from 'react';
import minesweeperLogo from '../assets/minesweeperStartLogo.png';
import { useStore } from '../store';
import './Taskbar.css';

export function Taskbar() {
  const openMinesweeper = useStore((s) => s.setMinesweeperWindowOpen);
  const [showMenu, setShowMenu] = React.useState(false);
  const taskbarRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (
        taskbarRef.current &&
        (taskbarRef.current as HTMLDivElement).contains(e.target as Node)
      ) {
        return;
      }
      setShowMenu(false);
    };

    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  function handleStartClick() {
    setShowMenu(!showMenu);
  }

  function handleShowMinesweeper() {
    openMinesweeper();
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
              Minesweeper
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
