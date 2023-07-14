import useLocalStorageState from 'hooks/utils/useLocalStorageState';

interface ISampleLocalStorageWithExpiryProps {}
const SampleLocalStorageWithExpiry: React.FC<
  ISampleLocalStorageWithExpiryProps
> = ({}) => {
  const [count, setCount, countPopulated] = useLocalStorageState(
    'count',
    1,
    10
  );
  return (
    <div>
      <p>Count: {count}</p>
      <button
        onClick={() => {
          setCount((prev) => prev + 1, 20);
        }}
      >
        Increment
      </button>
      <p>countPopulated: {JSON.stringify(countPopulated)}</p>
    </div>
  );
};
export default SampleLocalStorageWithExpiry;
