import useNotify from 'hooks/app/useNotify';

interface ISampleNotificationProps {}
const SampleNotification: React.FC<ISampleNotificationProps> = ({}) => {
  const notify = useNotify();
  return (
    <div>
      <button
        onClick={() => {
          notify('some message', { type: 'error' });
        }}
      >
        error
      </button>
      <button
        onClick={() => {
          notify('some message', { type: 'info' });
        }}
      >
        info
      </button>
      <button
        onClick={() => {
          notify('some message', {
            type: 'success',
            handleUndo: () => {
              console.log('undo called');
            },
          });
        }}
      >
        success
      </button>
      <button
        onClick={() => {
          notify('some message', { type: 'warning' });
        }}
      >
        warning
      </button>
    </div>
  );
};
export default SampleNotification;
