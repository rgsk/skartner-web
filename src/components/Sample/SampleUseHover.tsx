import clsx from 'clsx';
import useHover from 'hooks/utils/useHover';
import { useRef } from 'react';

interface ISampleUseHoverProps {}
const SampleUseHover: React.FC<ISampleUseHoverProps> = ({}) => {
  const paraRef = useRef<HTMLDivElement>(null);
  const hovered = useHover(paraRef);
  return (
    <div>
      <p ref={paraRef} className="cursor-pointer">
        hover me
      </p>

      <div
        className={clsx(hovered ? 'border border-solid border-red-300' : '')}
      >
        some other thing
      </div>
    </div>
  );
};
export default SampleUseHover;
