import { useEffect, useState } from 'react';

const useWindowSize = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const cb = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    cb();
    window.addEventListener('resize', cb);
    return () => {
      window.removeEventListener('resize', cb);
    };
  }, []);

  return {
    windowWidth,
    windowHeight,
  };
};
export default useWindowSize;
