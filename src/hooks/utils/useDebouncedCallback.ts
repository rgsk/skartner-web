import { useCallback, useEffect, useRef } from 'react';

const useDebouncedCallback = (func: () => void, delay = 500) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const funcRef = useRef(func);
  funcRef.current = func;

  const callback = useCallback(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(funcRef.current, delay);
  }, [delay]);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);
  return callback;
};
export default useDebouncedCallback;
