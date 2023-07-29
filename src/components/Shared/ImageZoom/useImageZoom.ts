import useRefresh from 'hooks/utils/useRefresh';
import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

/**
 * NOTE: that image should be square, for zoom to work correctly
 */
const useImageZoom = ({ zoomMultiplier }: { zoomMultiplier: number }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const zoomedImageContainerRef = useRef<HTMLDivElement>(null);
  const [zoomedImageContainerDimensions, setZoomedImageContainerDimensions] =
    useState({
      width: 0,
      height: 0,
    });
  const { refresh, refreshDep } = useRefresh();
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [zoomedImageActive, setZoomedImageActive] = useState(false);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const updateDimensions = useCallback(() => {
    const zoomedImageContainer = zoomedImageContainerRef.current;
    if (zoomedImageContainer) {
      setZoomedImageContainerDimensions({
        width: zoomedImageContainer.clientWidth,
        height: zoomedImageContainer.clientHeight,
      });
    }
    const image = imageRef.current;
    if (image) {
      // NOTE: that image should be square, for zoom to work correctly
      setImageDimensions({
        width: image.clientWidth,
        height: image.clientHeight,
      });
    }
  }, []);

  useEffect(() => {
    // underscore pattern is used
    // so that eslint raises warning if we don't provide refreshDep in dependency list
    const _ = refreshDep;
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [updateDimensions, refreshDep]);

  useEffect(() => {
    const _ = refreshDep;
    // updating dimensions is important when zoomedImageActive is changed
    const __ = zoomedImageActive;
    updateDimensions();
  }, [refreshDep, updateDimensions, zoomedImageActive]);

  const viewBoxDimensions = useMemo(() => {
    return {
      width: Math.min(
        zoomedImageContainerDimensions.width / zoomMultiplier,
        imageDimensions.width
      ),
      height: Math.min(
        zoomedImageContainerDimensions.height / zoomMultiplier,
        imageDimensions.height
      ),
    };
  }, [
    imageDimensions.height,
    imageDimensions.width,
    zoomMultiplier,
    zoomedImageContainerDimensions.height,
    zoomedImageContainerDimensions.width,
  ]);
  useEffect(() => {
    const _ = refreshDep;
    const image = imageRef.current;
    if (image) {
      const cb = (e: MouseEvent) => {
        setZoomedImageActive(true);
        const rect = image.getBoundingClientRect();
        let newMouse = {
          x: e.clientX - rect.x,
          y: e.clientY - rect.y,
        };

        // below takes care if viewBox exceeds bottom-right bounds
        newMouse = {
          x: Math.min(
            newMouse.x,
            imageDimensions.width - viewBoxDimensions.width / 2
          ),
          y: Math.min(
            newMouse.y,
            imageDimensions.height - viewBoxDimensions.height / 2
          ),
        };

        // below takes care if viewBox exceeds top-left bounds
        newMouse = {
          x: Math.max(newMouse.x, viewBoxDimensions.width / 2),
          y: Math.max(newMouse.y, viewBoxDimensions.height / 2),
        };

        setMouse(newMouse);
      };
      image.addEventListener('mousemove', cb);
      return () => {
        image.removeEventListener('mousemove', cb);
      };
    }
  }, [
    imageDimensions.height,
    imageDimensions.width,
    viewBoxDimensions.height,
    viewBoxDimensions.width,
    refreshDep,
  ]);

  useEffect(() => {
    const _ = refreshDep;
    const image = imageRef.current;
    if (image) {
      const cbMouseLeave = (e: MouseEvent) => {
        setZoomedImageActive(false);
      };
      image.addEventListener('mouseleave', cbMouseLeave);
      return () => {
        image.removeEventListener('mouseleave', cbMouseLeave);
      };
    }
  }, [refreshDep]);

  return {
    imageRef,
    zoomedImageContainerRef,
    viewBoxStyles: {
      position: 'absolute',
      width: viewBoxDimensions.width,
      height: viewBoxDimensions.height,
      top: mouse.y - viewBoxDimensions.height / 2,
      left: mouse.x - viewBoxDimensions.width / 2,
      pointerEvents: 'none' as 'none',
    } as CSSProperties,
    zoomedImageStyles: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      objectPosition: 'center',
      minWidth: imageDimensions.width * zoomMultiplier,
      minHeight: imageDimensions.height * zoomMultiplier,
      transform: `translate(-${
        (mouse.x - viewBoxDimensions.width / 2) * zoomMultiplier
      }px, -${(mouse.y - viewBoxDimensions.height / 2) * zoomMultiplier}px)`,
    } as CSSProperties,
    zoomedImageContainerStyles: {
      overflow: 'hidden',
    } as CSSProperties,
    zoomedImageActive,
    refresh,
  };
};
export default useImageZoom;
