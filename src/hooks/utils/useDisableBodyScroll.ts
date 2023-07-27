import { useEffect } from 'react';

const useDisableBodyScroll = () => {
  useEffect(() => {
    // disables the scroll on parent body
    const className = 'overflow-hidden';
    document.body.classList.add(className);
    return () => {
      document.body.classList.remove(className);
    };
  }, []);
};

export default useDisableBodyScroll;
