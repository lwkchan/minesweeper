import { Taskbar } from './Taskbar';
import { Minesweeper } from './Minesweeper';
import { useStore } from '../store';
import { WindowContainer } from './WindowContainer';

import './App.css';

function App() {
  const {
    isMineSweeperWindowOpen,
    isAboutWindowOpen,
    closeAboutWindow,
  } = useStore((s) => {
    return {
      isMineSweeperWindowOpen: s.isMineSweeperWindowOpen,
      isAboutWindowOpen: s.isAboutWindowOpen,
      closeAboutWindow: s.setAboutWindowClosed,
    };
  });

  return (
    <div className="main">
      {isAboutWindowOpen && (
        <WindowContainer
          windowTitle="About"
          width={480}
          onClose={closeAboutWindow}
        >
          <div className="window-body">
            <p>
              Built by <a href="https://twitter.com/lwkchan">@lwkchan</a>
            </p>
            <p>
              Source code on{' '}
              <a href="https://github.com/lwkchan/minesweeper">Github</a>
            </p>
          </div>
        </WindowContainer>
      )}
      {isMineSweeperWindowOpen && <Minesweeper />}
      <Taskbar />
    </div>
  );
}

export default App;
