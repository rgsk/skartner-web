import RevealContent from 'components/Shared/RevealContent';
import { useRef, useState } from 'react';

interface ISampleRevealContentProps {}
const SampleRevealContent: React.FC<ISampleRevealContentProps> = ({}) => {
  const [show, setShow] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showSecondPara, setShowSecondPara] = useState(false);
  return (
    <div>
      <div ref={containerRef} className="p-0 m-0">
        <div>visible para</div>
        <RevealContent
          parentRef={containerRef}
          show={show}
          deps={[showSecondPara]}
        >
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
            cupiditate sed quis dolor ratione maiores voluptas sequi ducimus,
            rem architecto minus, inventore, sapiente possimus non suscipit
            similique assumenda totam adipisci!
          </div>
          {showSecondPara && (
            <div>
              second para Lorem ipsum, dolor sit amet consectetur adipisicing
              elit. Error animi at, cum voluptates laudantium voluptate
              blanditiis! Soluta obcaecati iste tempora suscipit sapiente qui,
              maxime consequuntur, vel, expedita aut repellendus dolorum.
            </div>
          )}
        </RevealContent>
      </div>
      <button
        onClick={() => {
          setShow((prev) => !prev);
        }}
      >
        toggle {'"show"'}/{'"not show"'}
      </button>
      <button
        onClick={() => {
          setShowSecondPara((prev) => !prev);
        }}
      >
        {showSecondPara ? 'hide' : 'show'} second para
      </button>
    </div>
  );
};
export default SampleRevealContent;
