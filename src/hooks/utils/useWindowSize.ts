import { useGlobalContext } from 'context/GlobalContext';
import { useState } from 'react';
import useDebouncedCallback from './useDebouncedCallback';
import useEventListener from './useEventListener';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

export const useSetupWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  // 200ms after the last call to handleResize
  // we call the setWindowSize function
  // every 200ms for next 1 second
  const debouncedCallback = useDebouncedCallback(() => {
    runCodeWithInterval({
      intervalTime: 200,
      duration: 1000,
      callback: () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      },
    });
  }, 200);

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    debouncedCallback();
  };

  // Set size at the first client-side load
  useIsomorphicLayoutEffect(() => {
    handleResize();
  }, []);

  useEventListener('resize', handleResize);

  // on ipad windowSize was not setting correctly on orientation change
  // that's why we also listen to orientationchange
  useEventListener('orientationchange', handleResize);

  return { windowWidth: windowSize.width, windowHeight: windowSize.height };
};

const useWindowSize = () => {
  // we save windowSize in global context so that
  // the effects are only setup once, not every time when useWindowSize is used in components
  const { windowWidth, windowHeight } = useGlobalContext();
  return { windowWidth, windowHeight };
};

export default useWindowSize;

function runCodeWithInterval({
  intervalTime,
  duration,
  callback,
}: {
  intervalTime: number;
  duration: number;
  callback: () => void;
}) {
  callback();
  let startTime = Date.now();
  const intervalId = setInterval(() => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;

    if (elapsedTime >= duration) {
      clearInterval(intervalId);
    } else {
      callback();
    }
  }, intervalTime);

  return intervalId;
}
