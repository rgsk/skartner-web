import useSafeSetTimeout from 'hooks/utils/useSafeSetTimeout';
import { useEffect, useState } from 'react';

interface ISampleSafeSetTimeoutProps {}
const SampleSafeSetTimeout: React.FC<ISampleSafeSetTimeoutProps> = ({}) => {
  const [show, setShow] = useState(true);
  return (
    <div>
      <div>
        <button
          onClick={() => {
            setShow((prev) => !prev);
          }}
        >
          {show ? 'hide' : 'show'}
        </button>
      </div>

      {show && <Component />}
    </div>
  );
};
export default SampleSafeSetTimeout;

interface IComponentProps {}
const Component: React.FC<IComponentProps> = ({}) => {
  const [count, setCount] = useState(0);
  const { setSafeTimeout, clearSafeTimeout } = useSafeSetTimeout();

  useEffect(() => {
    const timer1 = setSafeTimeout(() => {
      console.log('This will be called after 1 second');
      setCount(1);
    }, 1000);

    const timer2 = setSafeTimeout(() => {
      setCount(3);
      console.log('This will be called after 3 seconds.');
    }, 3000);

    return () => {
      clearSafeTimeout(timer1);
      clearSafeTimeout(timer2);
    };
  }, [setSafeTimeout, clearSafeTimeout]);

  return (
    <div>
      <p>Count: {count}</p>
    </div>
  );
};
