import usePaste from 'hooks/utils/usePaste';

interface SampleUsePasteProps {}
const SampleUsePaste: React.FC<SampleUsePasteProps> = ({}) => {
  usePaste(() => {
    console.log('Pasted!');
  });
  return <div>SampleUsePaste Press CMD + V on Mac or CTRL + V on Windows</div>;
};
export default SampleUsePaste;
