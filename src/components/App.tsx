import { Taskbar } from './Taskbar';
import { Minesweeper } from './Minesweeper';
import { useStore } from '../store';

import './App.css';

function App() {
  const isMineSweeperWindowOpen = useStore((s) => s.isMineSweeperWindowOpen);

  return (
    <div className="main">
      {isMineSweeperWindowOpen && <Minesweeper />}
      <Taskbar />
    </div>
  );
}

export default App;
