import { RefObject, useState } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

// SAMPLE: SampleResizeObserver.tsx

const useResizeObserver = <T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T>
) => {
  const [boundingRect, setBoundingRect] = useState<DOMRect>();

  // useIsomorphicLayoutEffect is used
  // so that we use useLayoutEffect on the client side
  // this ensures that rect is populated before we paint to the screen
  useIsomorphicLayoutEffect(() => {
    const element = elementRef.current;
    if (element) {
      // setting below is necassary to ensure there is no delay in populating boundingRect
      // and UI shows proper dimensions from the start
      setBoundingRect(element.getBoundingClientRect());

      const resize_ob = new ResizeObserver(function (entries) {
        // since we are observing only a single element, so we access the first element in entries array
        let rect = entries[0].contentRect;
        setBoundingRect(rect);
      });
      resize_ob.observe(element);
      return () => {
        resize_ob.unobserve(element);
      };
    }
  }, [elementRef]);
  return boundingRect;
};
export default useResizeObserver;
