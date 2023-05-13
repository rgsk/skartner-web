import UserRequired from 'components/Auth/UserRequired';
import GrePage from 'components/GrePage/GrePage';

const Page = () => {
  return (
    <div>
      <UserRequired>
        <GrePage />
      </UserRequired>
    </div>
  );
};
export default Page;
