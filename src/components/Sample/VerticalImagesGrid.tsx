/* eslint-disable @next/next/no-img-element */
import useScrollTracker from 'hooks/utils/useScrollTracker';
import useToggle from 'hooks/utils/useToggle';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { ScrollableArrow } from './SampleScrollTracker/Children/Vertical';

const SIDE_IMAGE_WIDTH = 40;
const SIDE_IMAGE_PADDING = 8;

interface IVerticalImagesGridProps {
  images: string[];
  setImgIndex: Dispatch<SetStateAction<number>>;
  imgIndex: number;
}
const VerticalImagesGrid: React.FC<IVerticalImagesGridProps> = ({
  images,
  imgIndex,
  setImgIndex,
}) => {
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const [toggleDep, toggle] = useToggle(false);

  const { scrolledToTop, scrolledToBottom, scrollElement } = useScrollTracker(
    {
      elementRef: imagesContainerRef,
      offsetPerScroll: 100,
      autoScrollOffset: 50,
    },
    [toggleDep]
  );
  useEffect(() => {
    setTimeout(toggle, 10);
    setTimeout(toggle, 100);
  }, [toggle]);

  return (
    <div
      className={`
absolute left-0 max-h-full z-10 bg-[#F8F8F8]
flex flex-col select-none
`}
    >
      <ScrollableArrow
        variant="up"
        show={!scrolledToTop}
        onClick={() => {
          scrollElement('top');
        }}
      />
      <div
        className="flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar"
        ref={imagesContainerRef}
      >
        {images.map((image, i) => (
          <div
            className={`animated relative fadeIn duration-100 flex
      cursor-pointer
      overflow-hidden box-content border border-solid
      hover:border-indigo-400 focus:border-indigo-300 ${
        i === imgIndex ? 'border-indigo-400' : 'border-transparent'
      }`}
            style={{ padding: SIDE_IMAGE_PADDING }}
            key={i}
            onMouseEnter={() => {
              // change images on mouse enter instead of click
              setImgIndex(i);
            }}
            onClick={() => {
              // on mobile after getting into expanded mode
              // when we return the first image change doesn't work
              // that's why this click listener is added
              setImgIndex(i);
            }}
          >
            <img
              src={image}
              width={SIDE_IMAGE_WIDTH}
              height={SIDE_IMAGE_WIDTH}
              className="object-contain"
              alt=""
            />
          </div>
        ))}
      </div>
      <ScrollableArrow
        variant="down"
        show={!scrolledToBottom}
        onClick={() => {
          scrollElement('bottom');
        }}
      />
    </div>
  );
};
export default VerticalImagesGrid;

interface IVerticalImagesGridProxyProps {}
export const VerticalImagesGridProxy: React.FC<
  IVerticalImagesGridProxyProps
> = ({}) => {
  return (
    <div
      style={{
        width: SIDE_IMAGE_WIDTH + SIDE_IMAGE_PADDING * 2,
        marginRight: 16,
      }}
    ></div>
  );
};
