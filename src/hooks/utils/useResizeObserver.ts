import { RefObject, useEffect, useState } from 'react';

// SAMPLE: SampleResizeObserver.tsx

const useResizeObserver = <T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T>
) => {
  const [boundingRect, setBoundingRect] = useState<DOMRect>();

  useEffect(() => {
    const element = elementRef.current;
    if (element) {
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
