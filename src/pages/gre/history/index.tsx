import UserRequired from 'components/Auth/UserRequired';
import GreHistoryPage from 'components/GrePage/Pages/GreHistoryPage';

const Page = () => {
  return (
    <div>
      <UserRequired>
        <GreHistoryPage />
      </UserRequired>
    </div>
  );
};
export default Page;
