import useResizeObserver from 'hooks/utils/useResizeObserver';
import { useRef, useState } from 'react';

interface ISampleResizeObserverProps {}
const SampleResizeObserver: React.FC<ISampleResizeObserverProps> = ({}) => {
  const [showSecondPara, setShowSecondPara] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const divRect = useResizeObserver(divRef);
  return (
    <div>
      <div>
        <button
          onClick={() => {
            setShowSecondPara((prev) => !prev);
          }}
        >
          {showSecondPara ? 'hide' : 'show'} second para
        </button>
      </div>
      <div>
        <p>Dimensions: {JSON.stringify(divRect)}</p>
      </div>
      <div ref={divRef}>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
          cupiditate sed quis dolor ratione maiores voluptas sequi ducimus, rem
          architecto minus, inventore, sapiente possimus non suscipit similique
          assumenda totam adipisci!
        </div>
        {showSecondPara && (
          <div>
            second para Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. Error animi at, cum voluptates laudantium voluptate
            blanditiis! Soluta obcaecati iste tempora suscipit sapiente qui,
            maxime consequuntur, vel, expedita aut repellendus dolorum.
          </div>
        )}
      </div>
    </div>
  );
};
export default SampleResizeObserver;
