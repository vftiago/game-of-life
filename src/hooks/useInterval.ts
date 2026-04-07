import { useEffect, useRef } from "react";

export const useInterval = (callback: () => void, delay: number) => {
  const callbackRef = useRef<() => void>(() => {});

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => callbackRef.current();
    const id = window.setInterval(tick, delay);

    return () => window.clearInterval(id);
  }, [delay]);
};
