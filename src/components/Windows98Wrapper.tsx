import React from 'react';
import minesweeperIcon from '../assets/minesweeperIcon.png';

interface Props {
  width: number;
  children: React.ReactNode;
}

export function Windows98Wrapper({ width, children }: Props) {
  const [state, setState] = React.useState({
    isDragging: false,
    positionX: 10,
    positionY: 10,
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

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div
      style={{
        width,
        position: 'absolute',
        left: `${state.positionX}px`,
        top: `${state.positionY}px`,
      }}
      className="window"
      ref={windowRef}
    >
      <div
        onMouseDown={handleMouseDown}
        style={{ justifyContent: 'flex-start', userSelect: 'none' }}
        className="title-bar"
      >
        <img
          style={{ maxHeight: '18px', marginRight: '5px' }}
          src={minesweeperIcon}
          alt="Minesweeper icon"
        />
        <div className="title-bar-text">Minesweeper</div>
      </div>
      {children}
    </div>
  );
}
