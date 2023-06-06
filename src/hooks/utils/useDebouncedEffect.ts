import { useEffect } from 'react';

const useDebouncedEffect = (func: () => void, delay = 500) => {
  useEffect(() => {
    const timer = setTimeout(func, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay, func]);
};

export default useDebouncedEffect;
