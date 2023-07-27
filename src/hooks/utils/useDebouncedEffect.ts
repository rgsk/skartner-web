import { useEffect } from 'react';

// SAMPLE: SampleDebounce.tsx

// useDebouncedEffect doesn't provides the deps like interface
// because we won't get eslint suggestions
// it's better to pass a function wrapped in useCallback, and specify depedency in that

const useDebouncedEffect = (func: () => void, delay = 500) => {
  useEffect(() => {
    const timer = setTimeout(func, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay, func]);
};

export default useDebouncedEffect;
