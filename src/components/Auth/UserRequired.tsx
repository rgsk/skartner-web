import useUserRequired from 'hooks/auth/useUserRequired';

interface IUserRequiredProps {
  children: any;
}
const UserRequired: React.FC<IUserRequiredProps> = ({ children }) => {
  const userPresent = useUserRequired();
  return <div>{userPresent && children}</div>;
};
export default UserRequired;
