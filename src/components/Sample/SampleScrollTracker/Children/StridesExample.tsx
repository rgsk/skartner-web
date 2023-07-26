import useScrollTracker from 'hooks/utils/useScrollTracker';
import { useRef, useState } from 'react';

interface IStridesExampleProps {}
const StridesExample: React.FC<IStridesExampleProps> = ({}) => {
  return (
    <div className="w-[500px] max-w-full">
      <UCCategoriesSlider />
    </div>
  );
};
export default StridesExample;

interface IUCCategoriesSliderProps {}
const UCCategoriesSlider: React.FC<IUCCategoriesSliderProps> = ({}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollToStride, numOfStrides } = useScrollTracker({
    // we don't have autoOffset in this case
    autoScrollOffset: 0,
    elementRef: scrollContainerRef,
    offsetPerScroll: 300,
    setActiveStride: setActiveIndex,
  });
  return (
    <div>
      <div className="flex justify-center">
        <div
          // total gap was 6 or 24px, out of that 3.5 margin is taken by arrow
          className="flex gap-2.5 overflow-auto hide-scrollbar"
          ref={scrollContainerRef}
        >
          {Array(10)
            .fill(0)
            .map((v, i) => (
              <div
                key={i}
                className="bg-yellow-300 min-w-[100px] min-h-[100px] flex items-center justify-center"
              >
                <h1>{i}</h1>
              </div>
            ))}
        </div>
      </div>
      {numOfStrides > 1 && (
        <div className="mt-5">
          <CarouselNavigationDots
            activeIndex={activeIndex}
            numberOfDots={numOfStrides}
            onDotClick={(index) => {
              scrollToStride({ activeIndex, index });
            }}
            transitionDuration={400}
          />
        </div>
      )}
    </div>
  );
};

import clsx from 'clsx';

interface ICarouselNavigationDotsProps {
  transitionDuration?: number;
  numberOfDots: number;
  onDotClick: (index: number) => void;
  activeIndex: number;
}
const CarouselNavigationDots: React.FC<ICarouselNavigationDotsProps> = ({
  transitionDuration = 400,
  numberOfDots,
  onDotClick,
  activeIndex,
}) => {
  return (
    <div className={`flex justify-center space-x-3`}>
      {Array(numberOfDots)
        .fill(0)
        .map((_, index) => {
          return (
            <div
              onClick={() => {
                onDotClick(index);
              }}
              className={clsx(
                {
                  [`w-3 h-3 md:w-1.5 md:h-1.5 cursor-pointer rounded-full transition-all`]:
                    true,
                },
                activeIndex === index
                  ? 'bg-[#1B2124] scale-150'
                  : 'bg-[#C9C9C9]'
              )}
              style={{ transitionDuration: transitionDuration + 'ms' }}
              key={index}
            ></div>
          );
        })}
    </div>
  );
};
