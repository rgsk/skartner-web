import {
  DependencyList,
  RefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';
import useWindowSize from './useWindowSize';
const useScrollTracker = <T extends HTMLElement = HTMLElement>(
  {
    elementRef,
    autoScrollOffset,
    offsetPerScroll,
    setActiveStride,
  }: {
    elementRef: RefObject<T>;
    autoScrollOffset: number;
    offsetPerScroll: number;
    setActiveStride?: (stride: number) => void;
  },
  deps: DependencyList = []
) => {
  const [scrolledToRight, setScrolledToRight] = useState(true);
  const [scrolledToLeft, setScrolledToLeft] = useState(true);
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const [scrolledToBottom, setScrolledToBottom] = useState(true);
  const [numOfStrides, setNumberOfStrides] = useState(0);
  const { windowWidth, windowHeight } = useWindowSize();
  const checkScrolledToEnd = useCallback(() => {
    const element = elementRef.current;
    // Threshold For Considering Scrolled To End
    const threshold = 10;
    if (element) {
      if (
        element.scrollLeft + element.clientWidth - element.scrollWidth >
        -threshold
      ) {
        setScrolledToRight(true);
      } else {
        setScrolledToRight(false);
      }
      if (element.scrollLeft < threshold) {
        setScrolledToLeft(true);
      } else {
        setScrolledToLeft(false);
      }
      if (
        element.scrollTop + element.clientHeight - element.scrollHeight >
        -threshold
      ) {
        setScrolledToBottom(true);
      } else {
        setScrolledToBottom(false);
      }
      if (element.scrollTop < threshold) {
        setScrolledToTop(true);
      } else {
        setScrolledToTop(false);
      }
      setNumberOfStrides(
        Math.ceil(
          (element.scrollWidth - element.clientWidth) / offsetPerScroll
        ) + 1
      );
      setActiveStride?.(Math.ceil(element.scrollLeft / offsetPerScroll));
    }
  }, [elementRef, offsetPerScroll, setActiveStride]);

  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      element.addEventListener('scroll', checkScrolledToEnd);
      return () => {
        element.removeEventListener('scroll', checkScrolledToEnd);
      };
    }
  }, [elementRef, checkScrolledToEnd]);

  useEffect(() => {
    // dummy deps
    const _ = [windowHeight, windowWidth];
    checkScrolledToEnd();
  }, [
    checkScrolledToEnd,
    windowHeight,
    windowWidth,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...deps,
  ]);

  const scrollElement = useCallback(
    (
      type: 'left' | 'right' | 'top' | 'bottom',
      customOffsetPerScroll?: number
    ) => {
      const finalOffsetPerScroll = customOffsetPerScroll
        ? customOffsetPerScroll
        : offsetPerScroll;
      const element = elementRef.current;
      if (element) {
        switch (type) {
          case 'right': {
            const rightScrollRemaining =
              element.scrollWidth - element.clientWidth - element.scrollLeft;
            if (
              rightScrollRemaining <=
              finalOffsetPerScroll + autoScrollOffset
            ) {
              element.scrollBy({
                left: rightScrollRemaining,
                behavior: 'smooth',
              });
            } else {
              element.scrollBy({
                left: finalOffsetPerScroll,
                behavior: 'smooth',
              });
            }
            break;
          }
          case 'left': {
            const leftScrollRemaining = element.scrollLeft;
            if (
              leftScrollRemaining <=
              finalOffsetPerScroll + autoScrollOffset
            ) {
              element.scrollBy({
                left: -leftScrollRemaining,
                behavior: 'smooth',
              });
            } else {
              element.scrollBy({
                left: -finalOffsetPerScroll,
                behavior: 'smooth',
              });
            }
            break;
          }
          case 'bottom': {
            const bottomScrollRemaining =
              element.scrollHeight - element.clientHeight - element.scrollTop;

            if (
              bottomScrollRemaining <=
              finalOffsetPerScroll + autoScrollOffset
            ) {
              element.scrollBy({
                top: bottomScrollRemaining,
                behavior: 'smooth',
              });
            } else {
              element.scrollBy({
                top: finalOffsetPerScroll,
                behavior: 'smooth',
              });
            }
            break;
          }
          case 'top': {
            const topScrollRemaining = element.scrollTop;
            if (topScrollRemaining <= finalOffsetPerScroll + autoScrollOffset) {
              element.scrollBy({
                top: -topScrollRemaining,
                behavior: 'smooth',
              });
            } else {
              element.scrollBy({
                top: -finalOffsetPerScroll,
                behavior: 'smooth',
              });
            }
            break;
          }
        }
      }
    },
    [elementRef, offsetPerScroll, autoScrollOffset]
  );

  const scrollToStride = useCallback(
    ({ activeIndex, index }: { activeIndex: number; index: number }) => {
      if (index > activeIndex) {
        scrollElement('right', (index - activeIndex) * offsetPerScroll);
      } else {
        scrollElement('left', (activeIndex - index) * offsetPerScroll);
      }
    },
    [offsetPerScroll, scrollElement]
  );

  return {
    scrolledToLeft,
    scrolledToRight,
    scrolledToTop,
    scrolledToBottom,
    scrollElement,
    numOfStrides,
    scrollToStride,
  };
};
export default useScrollTracker;
