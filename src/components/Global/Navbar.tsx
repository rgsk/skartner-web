import { Box, Button } from '@mui/material';
import Link from 'components/Sample/Link';
import { useGlobalContext } from 'context/GlobalContext';
interface INavbarProps {}
const Navbar: React.FC<INavbarProps> = ({}) => {
  const { user, setUser } = useGlobalContext();
  const handleLogout = () => {
    setUser(null);
  };
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 2,
        }}
      >
        {user ? <Link href="/">{user?.email}</Link> : <Box />}
        {user ? (
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Link href="/login">
            <Button variant="contained">Login</Button>
          </Link>
        )}
      </Box>
    </Box>
  );
};
export default Navbar;
