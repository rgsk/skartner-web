import useCopyToClipboard from 'hooks/utils/useCopyToClipboard';

interface ISampleUseCopyToClipboardProps {}
const SampleUseCopyToClipboard: React.FC<
  ISampleUseCopyToClipboardProps
> = ({}) => {
  const { copy, copied } = useCopyToClipboard();
  const text = 'this is some text which could be copied';

  return (
    <div>
      <p>{text}</p>
      <button onClick={() => copy(text)}>{copied ? 'copied' : 'copy'}</button>
    </div>
  );
};
export default SampleUseCopyToClipboard;
