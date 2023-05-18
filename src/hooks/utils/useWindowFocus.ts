import { useEffect, useState } from 'react';

export function useWindowFocus() {
  const [isWindowFocused, setIsWindowFocused] = useState(hasFocus()); // Focus for first render.

  useEffect(() => {
    setIsWindowFocused(hasFocus()); // Focus for following renders.

    const onFocus = () => setIsWindowFocused(true);
    const onBlur = () => setIsWindowFocused(false);

    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);

    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  return { isWindowFocused };
}

function hasFocus() {
  return typeof window !== 'undefined' && document.hasFocus();
}
