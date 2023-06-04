import React from "react";

interface Props {
  width: number;
  children: React.ReactNode;
  onClose: (x: number, y: number) => void;
  initialX?: number;
  initialY?: number;
  iconSrc?: string;
  iconAlt?: string;
  windowTitle: string;
}

export function WindowContainer({
  initialX,
  initialY,
  width,
  iconSrc,
  iconAlt,
  windowTitle,
  children,
  onClose,
}: Props) {
  const [state, setState] = React.useState({
    isDragging: false,
    positionX: initialX || 10,
    positionY: initialY || 10,
  });
  const windowRef = React.useRef<HTMLDivElement>(null);

  // mouse move
  const handleMouseMove = React.useCallback(
    ({ movementX, movementY }) => {
      if (state.isDragging && windowRef.current) {
        setState((prevState) => ({
          ...prevState,
          positionX: prevState.positionX + movementX,
          positionY: prevState.positionY + movementY,
        }));
      }
    },
    [state.isDragging]
  );

  // mouse left click hold
  const handleMouseDown = React.useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      isDragging: true,
    }));
  }, []);

  // mouse left click release
  const handleMouseUp = React.useCallback(() => {
    if (state.isDragging) {
      setState((prevState) => ({
        ...prevState,
        isDragging: false,
      }));
    }
  }, [state.isDragging]);

  function handleClose() {
    onClose(state.positionX, state.positionY);
  }

  React.useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);
  return (
    <div
      style={{
        width,
        position: "absolute",
        left: `${state.positionX}px`,
        top: `${state.positionY}px`,
      }}
      className="window"
      ref={windowRef}
    >
      <div onMouseDown={handleMouseDown} className="noHighlight title-bar">
        <div
          className="title-bar-text"
          style={{ display: "flex", alignItems: "center" }}
        >
          {iconSrc && iconAlt && (
            <img
              style={{ maxHeight: "18px", marginRight: "5px" }}
              src={iconSrc}
              alt={iconAlt}
            />
          )}
          {windowTitle}
        </div>
        <div className="title-bar-controls">
          <button onClick={handleClose} aria-label="Close"></button>
        </div>
      </div>
      {children}
    </div>
  );
}
