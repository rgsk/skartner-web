import GrePage from 'components/GrePage/GrePage';

interface ISampleHeavyComponentProps {}
const SampleHeavyComponent: React.FC<ISampleHeavyComponentProps> = ({}) => {
  return (
    <div>
      <p>SampleHeavyComponent</p>
      {/* this is to demonstrate a heavy component */}
      {/* we don't render GrePage because of errors
      import GrePage from 'components/GrePage/GrePage';
      above statement itself loads this component into bundle */}
      {false && <GrePage />}
    </div>
  );
};
export default SampleHeavyComponent;
