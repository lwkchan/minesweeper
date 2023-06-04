import React from "react";

type TUseCountUp = {
  time: number;
  isRunning: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
};

export function useCountUp(isRequiredToStop: boolean): TUseCountUp {
  const [isRunning, setIsRunning] = React.useState<boolean>(false);
  const [time, setTime] = React.useState<number>(0);

  React.useEffect(() => {
    let intervalId: number;

    if (isRunning) {
      intervalId = window.setInterval(
        () => setTime((currentTime) => currentTime + 1),
        1000
      );
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  React.useEffect(() => {
    if (isRequiredToStop && isRunning) {
      setIsRunning(false);
    }
  }, [isRequiredToStop, isRunning]);

  const startTimer = () => setIsRunning(true);

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  const stopTimer = () => setIsRunning(false);

  return { time, startTimer, resetTimer, stopTimer, isRunning };
}
