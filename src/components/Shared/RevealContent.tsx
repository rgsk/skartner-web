import useResizeObserver from 'hooks/utils/useResizeObserver';
import { useEffect, useRef, useState } from 'react';

// reference
// https://www.w3schools.com/howto/howto_js_accordion.asp#:~:text=if%20(panel.style.maxHeight)%20%7B

interface RevealContentProps {
  show: boolean;
  children: any;
  duration?: number;
}
const RevealContent = ({
  show,
  children,
  duration = 200,
}: RevealContentProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const childrenContainerRef = useRef<HTMLDivElement>(null);
  const childContainerRect = useResizeObserver(childrenContainerRef);

  const [scrollHeight, setScrollHeight] = useState(
    parentRef.current?.scrollHeight
  );

  useEffect(() => {
    setScrollHeight(parentRef.current?.scrollHeight);
  }, [childContainerRect?.height]);

  return (
    <div
      ref={parentRef}
      style={{
        overflow: 'hidden',
        maxHeight: show ? scrollHeight : 0,
        transition: `max-height ${duration}ms ease`,
      }}
    >
      <div ref={childrenContainerRef}>{children}</div>
    </div>
  );
};
export default RevealContent;
