import { useStore } from "../store";
import { WindowContainer } from "./WindowContainer";

export function AboutWindow() {
  const closeAboutWindow = useStore((s) => {
    return s.setAboutWindowClosed;
  });
  return (
    <WindowContainer windowTitle="About" width={480} onClose={closeAboutWindow}>
      <div className="window-body">
        <p>
          Built by <a href="https://twitter.com/lwkchan">@lwkchan</a>
        </p>
        <p>
          Source code on{" "}
          <a href="https://github.com/lwkchan/minesweeper">Github</a>
        </p>
      </div>
    </WindowContainer>
  );
}
