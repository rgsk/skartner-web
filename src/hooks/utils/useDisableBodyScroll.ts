import { useEffect } from 'react';

const useDisableBodyScroll = (
  { enabled = true }: { enabled?: boolean } = { enabled: true }
) => {
  useEffect(() => {
    if (enabled) {
      // disables the scroll on parent body
      const className = 'overflow-hidden';
      document.body.classList.add(className);
      return () => {
        document.body.classList.remove(className);
      };
    }
  }, [enabled]);
};

export default useDisableBodyScroll;
