import { Box, Button } from '@mui/material';
import { useGlobalContext } from 'context/GlobalContext';

interface INavbarProps {}
const Navbar: React.FC<INavbarProps> = ({}) => {
  const { setUser } = useGlobalContext();
  const handleLogout = () => {
    setUser(null);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'end',
        p: 2,
      }}
    >
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};
export default Navbar;
