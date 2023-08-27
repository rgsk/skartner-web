import { useCallback, useEffect, useRef } from 'react';

const useCallRepeatedly = (cb: () => void, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const cbRef = useRef(cb);
  cbRef.current = cb;
  const start = useCallback(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setInterval(() => {
      cbRef.current();
    }, delay);
  }, [delay]);
  const stop = useCallback(() => {
    clearTimeout(timeoutRef.current);
  }, []);
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);
  return { start, stop };
};

export default useCallRepeatedly;
