/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx';
import useWindowSize from 'hooks/utils/useWindowSize';
import {
  ImgHTMLAttributes,
  TouchEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Slider from 'react-slick';
import PinchZoomImage from './PinchZoomImage';
// Import css files
interface IMobileImageCarouselProps {
  images: string[];
  initialIndex: number;
  closeCarousel: () => void;
}
const MobileImageCarousel: React.FC<IMobileImageCarouselProps> = ({
  images,
  initialIndex,
  closeCarousel,
}) => {
  const [zoomed, setZoomed] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(initialIndex);
  const sliderRef = useRef<Slider>(null);
  const { windowWidth, windowHeight } = useWindowSize();

  useEffect(() => {
    // disables the scroll on parent body
    document.body.classList.add('disable-scroll');
    return () => {
      document.body.classList.remove('disable-scroll');
    };
  }, []);

  const { slideNavigatorHeight, buttonContainerHeight, imageHeight } =
    useMemo(() => {
      const slideNavigatorHeight = 75;
      const buttonContainerHeight = 60;
      const imageHeight =
        windowHeight - buttonContainerHeight - slideNavigatorHeight;
      return {
        slideNavigatorHeight,
        buttonContainerHeight,
        imageHeight,
      };
    }, [windowHeight]);

  const renderImage = (props: ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      {...props}
      alt={props.alt || props.src}
      style={{
        height: imageHeight,
        width: windowWidth,
        objectFit: 'contain',
        objectPosition: 'center',
      }}
    />
  );
  const previousClickDateRef = useRef<Date>();
  const handleImageClick = () => {
    const currentDate = new Date();
    if (
      previousClickDateRef.current &&
      currentDate.getTime() - previousClickDateRef.current.getTime() < 500
    ) {
      setZoomed(true);
    }
    previousClickDateRef.current = currentDate;
  };
  const previousTouchDistanceRef = useRef<number>();
  const handleImageTouch: TouchEventHandler<HTMLImageElement> = (e) => {
    if (e.touches.length == 2) {
      const distance = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      if (
        previousTouchDistanceRef.current &&
        distance > previousTouchDistanceRef.current
      ) {
        setZoomed(true);
      }
      previousTouchDistanceRef.current = distance;
    }
  };
  useEffect(() => {
    previousTouchDistanceRef.current = undefined;
  }, [zoomed, activeSlideIndex]);
  useEffect(() => {
    setZoomed(false);
  }, [activeSlideIndex]);
  return (
    <div
      className="fixed top-0 left-0 w-full bg-white"
      style={{
        zIndex: 2147483647,
        height: windowHeight,
      }}
    >
      <div>
        <button
          onClick={(e) => {
            closeCarousel();
          }}
          className={`
             flex justify-center items-center
            `}
          style={{
            height: buttonContainerHeight,
            width: buttonContainerHeight,
          }}
        >
          <Cross />
        </button>
      </div>
      <div>
        <div>
          <Slider
            ref={sliderRef}
            dots={false}
            infinite={false}
            speed={200}
            slidesToShow={1}
            slidesToScroll={1}
            beforeChange={(currentSlide, nextSlide) => {
              setActiveSlideIndex(nextSlide);
            }}
            initialSlide={initialIndex}
          >
            {images.map((image, i) => (
              <div key={image + i} className="">
                {zoomed ? (
                  <PinchZoomImage
                    setZoomed={setZoomed}
                    buttonContainerHeight={buttonContainerHeight}
                  >
                    {renderImage({ src: image })}
                  </PinchZoomImage>
                ) : (
                  renderImage({
                    src: image,
                    onClick: handleImageClick,
                    onTouchStart: handleImageTouch,
                    onTouchMove: handleImageTouch,
                    onTouchEnd: () => {
                      previousTouchDistanceRef.current = undefined;
                    },
                  })
                )}
              </div>
            ))}
          </Slider>
        </div>
        <div className="flex justify-start px-1 space-x-1 overflow-auto">
          {images.map((image, index) => (
            <img
              className={clsx({
                'border border-solid border-indigo-400':
                  index === activeSlideIndex,
              })}
              src={image}
              key={index}
              alt=""
              style={{
                minWidth: slideNavigatorHeight,
                minHeight: slideNavigatorHeight,
                maxWidth: slideNavigatorHeight,
                maxHeight: slideNavigatorHeight,
                objectFit: 'contain',
                objectPosition: 'center',
              }}
              onClick={() => {
                const slider = sliderRef.current;
                if (slider) {
                  slider.slickGoTo(index);
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileImageCarousel;

const Cross = ({ ...props }) => {
  const width = props.width || 24;
  const height = props.height || 24;

  return (
    <svg
      viewBox="0 0 24 24"
      width={width}
      height={height}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
};
