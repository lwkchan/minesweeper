import React from 'react';
import minesweeperIcon from '../assets/minesweeperIcon.png';

interface Props {
  width: number;
  children: React.ReactNode;
}

export function Windows98Wrapper({ width, children }: Props) {
  const [state, setState] = React.useState({
    isDragging: false,
    translateX: 10,
    translateY: 10,
  });

  // mouse move
  const handleMouseMove = React.useCallback(
    ({ clientX, clientY }) => {
      if (state.isDragging) {
        setState((prevState) => ({
          ...prevState,
          translateX: clientX,
          translateY: clientY,
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
        transform: `translate(${state.translateX}px, ${state.translateY}px)`,
      }}
      className="window"
      onMouseDown={handleMouseDown}
    >
      <div style={{ justifyContent: 'flex-start' }} className="title-bar">
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
