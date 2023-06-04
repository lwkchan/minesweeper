import React from "react";

export function useHandleClickAway(
  onClickAway: (e: MouseEvent) => void,
  elementRef: React.RefObject<HTMLElement>
) {
  return React.useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (
        elementRef.current &&
        (elementRef.current as HTMLDivElement).contains(e.target as Node)
      ) {
        return;
      }
      onClickAway(e);
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [elementRef, onClickAway]);
}
