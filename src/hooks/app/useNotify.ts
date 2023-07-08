import { NotificationOptions } from 'components/Global/Notification';
import { useGlobalContext } from 'context/GlobalContext';
import { useCallback } from 'react';

const useNotify = () => {
  const { setNotification } = useGlobalContext();
  const notify = useCallback(
    (message: string, options?: NotificationOptions) => {
      setNotification({ message, ...options });
    },
    [setNotification]
  );
  return notify;
};
export default useNotify;
