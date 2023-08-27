import useCallRepeatedly from 'hooks/utils/useCallRepeatedly';
import { useState } from 'react';

interface ISampleUseCallRepeatedlyProps {}
const SampleUseCallRepeatedly: React.FC<
  ISampleUseCallRepeatedlyProps
> = ({}) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setShow((prev) => !prev);
        }}
      >
        toggle
      </button>
      {show && <Child />}
    </div>
  );
};
export default SampleUseCallRepeatedly;

interface IChildProps {}
const Child: React.FC<IChildProps> = ({}) => {
  const [count, setCount] = useState(1);
  const cb = () => {
    console.log(count);
  };
  const { start, stop } = useCallRepeatedly(cb, 200);
  return (
    <div>
      <div>
        <p>Count: {count}</p>
        <button
          onClick={() => {
            setCount((prev) => prev + 1);
          }}
        >
          increment
        </button>
      </div>
      <div>
        <button onClick={start}>start</button>
      </div>
      <div>
        <button onClick={stop}>stop</button>
      </div>
    </div>
  );
};
