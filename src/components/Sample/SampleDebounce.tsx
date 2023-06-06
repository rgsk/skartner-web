import useDebounce from 'hooks/utils/useDebounce';
import useDebouncedEffect from 'hooks/utils/useDebouncedEffect';
import { useCallback, useState } from 'react';

interface ISampleDebounceProps {}
const SampleDebounce: React.FC<ISampleDebounceProps> = ({}) => {
  return (
    <div>
      <SampleDebouncedEffect />
    </div>
  );
};
export default SampleDebounce;

interface ISampleDebouncedValueProps {}
const SampleDebouncedValue: React.FC<ISampleDebouncedValueProps> = ({}) => {
  const [count, setCount] = useState(0);
  const debouncedCount = useDebounce(count);
  return (
    <div className="p-2">
      <div>
        <p>Count: {count}</p>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          increment
        </button>
      </div>
      <div>
        <p>Debounced Count: {debouncedCount}</p>
      </div>
    </div>
  );
};

interface ISampleDebouncedEffectProps {}
const SampleDebouncedEffect: React.FC<ISampleDebouncedEffectProps> = ({}) => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [sum, setSum] = useState(count1 + count2);

  const changeSum = useCallback(() => {
    setSum(count1 + count2);
  }, [count1, count2]);

  useDebouncedEffect(changeSum);

  return (
    <div>
      <div>
        <p>Count1: {count1}</p>
        <button
          onClick={() => {
            setCount1((prev) => prev + 1);
          }}
        >
          increment
        </button>
      </div>
      <div>
        <p>Count2: {count2}</p>
        <button
          onClick={() => {
            setCount2((prev) => prev + 1);
          }}
        >
          increment
        </button>
      </div>
      <p>Sum: {sum}</p>
    </div>
  );
};
