import { useEffect, useState } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // on ipad windowSize was not setting correctly on orientation change
  // that's why we also listen to orientationchange
  useEffect(() => {
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return {
    windowWidth: windowSize.width,
    windowHeight: windowSize.height,
  };
};
export default useWindowSize;
