import { Taskbar } from './Taskbar';
import { Minesweeper } from './Minesweeper';
import { useStore } from '../store';
import { AboutWindow } from './AboutWindow';
import { useEffect } from 'react';

import './App.css';

function App() {
  const { isMineSweeperWindowOpen, isAboutWindowOpen } = useStore((s) => {
    return {
      isMineSweeperWindowOpen: s.isMineSweeperWindowOpen,
      isAboutWindowOpen: s.isAboutWindowOpen,
    };
  });

  useEffect(() => {
    import('../wasm')
      .then((pkg) => {
        pkg.greet();
      })
      .catch(console.error);
  }, []);

  return (
    <div className="main">
      {isAboutWindowOpen && <AboutWindow />}
      {isMineSweeperWindowOpen && <Minesweeper />}
      <Taskbar />
    </div>
  );
}

export default App;
