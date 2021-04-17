import { Taskbar } from './Taskbar';
import { Minesweeper } from './Minesweeper';
import { useStore } from '../store';
import { WindowContainer } from './WindowContainer';

import './App.css';
import { AboutWindow } from './AboutWindow';

function App() {
  const { isMineSweeperWindowOpen, isAboutWindowOpen } = useStore((s) => {
    return {
      isMineSweeperWindowOpen: s.isMineSweeperWindowOpen,
      isAboutWindowOpen: s.isAboutWindowOpen,
    };
  });

  return (
    <div className="main">
      {isAboutWindowOpen && <AboutWindow />}
      {isMineSweeperWindowOpen && <Minesweeper />}
      <Taskbar />
    </div>
  );
}

export default App;
