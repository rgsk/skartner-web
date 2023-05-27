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
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        p: 2,
      }}
    >
      <Link href="/">{user?.email}</Link>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};
export default Navbar;
