/* eslint-disable @next/next/no-img-element */
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

const sampleImages = [
  'https://plus.unsplash.com/premium_photo-1690297971162-5fe7ddf2c48d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1690286727405-ecdf6ab04bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1687360441205-807780a8e5db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60',
  'https://plus.unsplash.com/premium_photo-1687187499404-2ed3c77b3cfe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1690122991917-a06094f2e65d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1690184432960-ea288727b9c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1690215711687-777c0e2cb7e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
];

interface IVerticalProps {}
const Vertical: React.FC<IVerticalProps> = ({}) => {
  const [imgIndex, setImgIndex] = useState(0);
  return (
    <div>
      <div className="h-[200px] relative">
        <VerticalImagesGrid
          images={sampleImages}
          imgIndex={imgIndex}
          setImgIndex={setImgIndex}
        />
      </div>
    </div>
  );
};
export default Vertical;

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
    // if the images were loaded using the api call ssr arrows were not showing correctly
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
      overflow-hidden box-content border
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

import clsx from 'clsx';
import useDelayed from 'hooks/utils/useDelayed';
import useScrollTracker from 'hooks/utils/useScrollTracker';
import useToggle from 'hooks/utils/useToggle';

interface IScrollableArrowProps {
  variant: 'up' | 'down';
  show: boolean;
  onClick: () => void;
}
const ScrollableArrow: React.FC<IScrollableArrowProps> = ({
  variant,
  show,
  onClick,
}) => {
  const delayedShow = useDelayed(show, 100); // based on duration-100
  if (!show && !delayedShow) {
    return null;
  }
  return (
    <div
      onClick={onClick}
      className={clsx(
        `
        absolute w-full z-10
        bg-white flex justify-center items-center 
        py-2 cursor-pointer
        transition-opacity duration-100 ease-in-out
        border border-[#EFEFEF]
        `,
        variant === 'up' ? 'rotate-180 top-0' : 'bottom-0',
        show ? 'opacity-100' : 'opacity-0'
      )}
      style={{
        boxShadow: '0px -3px 10px rgba(0, 0, 0, 0.06)',
      }}
    >
      <ArrowDown />
    </div>
  );
};
const ArrowDown = () => {
  return (
    <svg
      width="8"
      height="4"
      viewBox="0 0 8 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.99987 2.58608L6.47487 0.111084L7.18187 0.818084L3.99987 4.00008L0.817871 0.818084L1.52487 0.111084L3.99987 2.58608Z"
        fill="black"
      />
    </svg>
  );
};
