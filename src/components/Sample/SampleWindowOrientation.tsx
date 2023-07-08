import useWindowOrientation from 'hooks/utils/useWindowOrientation';

interface ISampleWindowOrientationProps {}
const SampleWindowOrientation: React.FC<
  ISampleWindowOrientationProps
> = ({}) => {
  const orientation = useWindowOrientation();
  return (
    <div>
      <p>orientation: {orientation}</p>
    </div>
  );
};
export default SampleWindowOrientation;
