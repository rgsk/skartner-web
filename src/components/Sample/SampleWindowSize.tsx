import useWindowSize from 'hooks/utils/useWindowSize';

interface ISampleWindowSizeProps {}
const SampleWindowSize: React.FC<ISampleWindowSizeProps> = ({}) => {
  return (
    <div>
      <Child />
    </div>
  );
};
export default SampleWindowSize;

interface IChildProps {}
const Child: React.FC<IChildProps> = ({}) => {
  const { windowWidth, windowHeight } = useWindowSize();
  return (
    <div>
      <p>windowWidth: {windowWidth}</p>
      <p>windowHeight: {windowHeight}</p>
    </div>
  );
};
