import { useState } from 'react';

interface ICounterPageProps {}
const CounterPage: React.FC<ICounterPageProps> = ({}) => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p data-test="counter-value">Count: {count}</p>
      <button
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
        data-test="increment-button"
      >
        increment
      </button>
    </div>
  );
};
export default CounterPage;
