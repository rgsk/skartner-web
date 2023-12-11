import { useGlobalContext } from 'context/GlobalContext';
import { useNotificationReceivedSubscription } from 'gql/graphql';
import useNotify from 'hooks/app/useNotify';
import { useEffect } from 'react';
import Footer from './Footer';

interface ILayoutProps {
  children: any;
}
const Layout: React.FC<ILayoutProps> = ({ children }) => {
  useSubscribeToNotificationsFromServer();
  return (
    <div>
      {/* <Navbar /> */}
      {/* <Notification /> */}
      <div>{children}</div>
      <Footer />
    </div>
  );
};
export default Layout;

const useSubscribeToNotificationsFromServer = () => {
  const { user } = useGlobalContext();
  const notify = useNotify();
  const { data } = useNotificationReceivedSubscription({
    variables: { userId: user?.id ?? '' },
    skip: !user,
  });
  useEffect(() => {
    const message = data?.notificationReceived?.message;
    if (message) {
      notify(message);
    }
  }, [data?.notificationReceived?.message, notify]);
};
