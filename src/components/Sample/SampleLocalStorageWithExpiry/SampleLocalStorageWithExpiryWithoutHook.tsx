import { localStorageWithExpiry } from 'hooks/utils/useLocalStorageState';
import { useEffect, useState } from 'react';

interface ISampleLocalStorageWithExpiryWithoutHookProps {}
const SampleLocalStorageWithExpiryWithoutHook: React.FC<
  ISampleLocalStorageWithExpiryWithoutHookProps
> = ({}) => {
  const [count, setCount] = useState(1);
  useEffect(() => {
    const storedCount = localStorageWithExpiry.getItem<typeof count>('count');
    if (storedCount !== null) {
      setCount(storedCount);
    }
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button
        onClick={() => {
          const newCount = count + 1;
          localStorageWithExpiry.setItem(
            'count',
            newCount,
            localStorageWithExpiry.getExpirationTimestamp(30)
          );
          setCount(newCount);
        }}
      >
        Increment
      </button>
    </div>
  );
};
export default SampleLocalStorageWithExpiryWithoutHook;
